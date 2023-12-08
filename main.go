package main

import (
	"context"
	"flag"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/google/uuid"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/tools/leaderelection"
	"k8s.io/client-go/tools/leaderelection/resourcelock"
	"k8s.io/klog/v2"
)

var (
	kubeconfig     string
	leaseId        string
	leaseName      string
	leaseNamespace string
)

func main() {
	flag.StringVar(&kubeconfig, "kubeconfig", "", "kubeconfig file")
	flag.StringVar(&leaseId, "leaseId", uuid.New().String(), "identidy name")
	flag.StringVar(&leaseName, "leaseName", "", "lease lock name")
	flag.StringVar(&leaseNamespace, "leaseNamespace", "", "lease lock namespace")
	flag.Parse()

	if kubeconfig == "" {
		klog.Fatal("miss kubeconfig")
	}
	if leaseName == "" {
		klog.Fatal("miss leaseName")
	}
	if leaseNamespace == "" {
		klog.Fatal("miss leaseNamespace")
	}

	config, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		klog.Fatal(err)
	}
	client := clientset.NewForConfigOrDie(config)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-ch
		klog.Info("shutdown......")
		cancel()
	}()

	lock := &resourcelock.LeaseLock{
		LeaseMeta: metav1.ObjectMeta{
			Name:      leaseName,
			Namespace: leaseNamespace,
		},
		Client: client.CoordinationV1(),
		LockConfig: resourcelock.ResourceLockConfig{
			Identity: leaseId,
		},
	}

	leaderelection.RunOrDie(ctx, leaderelection.LeaderElectionConfig{
		Lock:            lock,
		ReleaseOnCancel: true,
		LeaseDuration:   30 * time.Second,
		RenewDeadline:   15 * time.Second,
		RetryPeriod:     5 * time.Second,
		Callbacks: leaderelection.LeaderCallbacks{
			OnStartedLeading: func(ctx context.Context) {
				for {
					klog.Info("something running.")
					time.Sleep(5 * time.Second)
				}
			},
			OnStoppedLeading: func() {
				klog.Fatalf("leaderelection lost")
			},
			OnNewLeader: func(identity string) {
				if identity == leaseId {
					klog.Info("still the leader.")
					return
				}
				klog.Infof("new leader is: %s", identity)
			},
		},
	})
}

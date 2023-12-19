# Err

```yml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
```

```sh
# 创建集群
kind create cluster --config=kind-config.yaml

# 检查是否开启了准入控制
apiserver_pod_name=$(kubectl -n kube-system --no-headers=true get pod | grep apiserver | awk '{print $1}')
kubectl -n kube-system --no-headers=true get pod $apiserver_pod_name -oyaml | grep plugins

# 输出如下
- --enable-admission-plugins=NodeRestriction

# kind 创建的 K8S 默认是没有的开启准入控制的，所以需要修改 apiserver 的启动参数
controlplane=$(docker ps --format '{{.ID}} {{.Names}}' | grep control | awk '{print $1}')

# 进去 controlplane 修改 kube-apiserver.yaml 配置文件
docker exec -it $controlplane /bin/bash

apt update -y && apt install vim -y

# 修改 apiserver 的启动参数
vi /etc/kubernetes/manifests/kube-apiserver.yaml

# 新增这两个 plugin
MutatingAdmissionWebhook,ValidatingAdmissionWebhook

# 然后重启 controlplane
docker stop $controlplane
docker start $controlplane

# 再次检查
kubectl -n kube-system --no-headers=true get pod $apiserver_pod_name -oyaml | grep plugins

# 如果输出如下，说明已经开启好了
- --enable-admission-plugins=NodeRestriction,MutatingAdmissionWebhook,ValidatingAdmissionWebhook
```

```sh
./deployment/webhook-create-signed-cert.sh
creating certs in tmpdir /var/folders/ns/f_24jl8s6ts7qx6gvwwl7jjr0000gn/T/tmp.UN47NWcc
certificatesigningrequest.certificates.k8s.io/admission-webhook-example-svc.default created
NAME                                    AGE   SIGNERNAME                      REQUESTOR          REQUESTEDDURATION   CONDITION
admission-webhook-example-svc.default   0s    kubernetes.io/kubelet-serving   kubernetes-admin   <none>              Pending
certificatesigningrequest.certificates.k8s.io/admission-webhook-example-svc.default approved
W1218 20:19:55.317502   82158 helpers.go:663] --dry-run is deprecated and can be replaced with --dry-run=client.
secret/admission-webhook-example-certs created
```

```sh
# 构建 webhook 镜像
sh build.sh

# 把本地镜像导入到集群中
kind load docker-image admission-webhook-example:v1

# 创建 webhook 的 deploy 和 service
kubectl apply -f deployment/deployment.yaml

kubectl apply -f deployment/service.yaml
```

```sh
# 配置 webhook
cat deployment/validatingwebhook.yaml | ./deployment/webhook-patch-ca-bundle.sh > ./deployment/validatingwebhook-ca-bundle.yaml
kubectl apply -f deployment/validatingwebhook-ca-bundle.yaml

# 由于 webhook 中配置了 namespaceSelector 
# 所以 webhook 只适用于 admission-webhook-example=enabled 标签的 namespace
# 所以需要给 default 这个 namespace 添加标签
kubectl label ns default admission-webhook-example=enabled

# 验证
kubectl apply -f deployment/sleep.yaml
Error from server (required labels are not set): error when creating "deployment/sleep.yaml": admission webhook "required-labels.qikqiak.com" denied the request: required labels are not set

kubectl apply -f deployment/sleep-with-labels.yaml
```

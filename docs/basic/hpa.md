# HPA

我们游戏中一个服务是用来做战斗校验的，会在某些时间段内内存急剧上升，过了之后内存释放，内存就会再降下来

下午的时候研发反馈说战斗过程中比较卡顿，说让我扩展一下 Pod 数量，想了想我直接给加上了 HPA

```sh
# 创建 HPA
kubectl autoscale deploy nginx --cpu-percent=50 --min=1 --max=4

# 查看刚刚创建的 HPA
kubectl get hpa
NAME    REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
nginx   Deployment/nginx   0%/50%    1         4         1          39s

# 查看 HPA 的 yaml 内容
kubectl get hpa nginx -oyaml
```

```yml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx
spec:
  maxReplicas: 4
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 50
        type: Utilization
    type: Resource
  minReplicas: 1
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
```

```sh
# 观察 HPA
kubectl get hpa --watch
NAME    REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
nginx   Deployment/nginx   0%/50%      1         4         1          45s
nginx   Deployment/nginx   1300%/50%   1         4         1          75s
nginx   Deployment/nginx   2000%/50%   1         4         4          90s
nginx   Deployment/nginx   1133%/50%   1         4         4          105s

# 下面这里是在停止压测之后的变化
nginx   Deployment/nginx   25%/50%     1         4         4          2m
nginx   Deployment/nginx   0%/50%      1         4         4          2m15s

# 观察 Pod 数量
kubectl get pod
NAME                     READY   STATUS              RESTARTS   AGE
demo                     1/1     Running             0          6m54s
nginx-658567fdfd-4vnrn   0/1     ContainerCreating   0          2s
nginx-658567fdfd-gzr4j   0/1     ContainerCreating   0          2s
nginx-658567fdfd-lzjdc   1/1     Running             0          3m56s
nginx-658567fdfd-q6558   0/1     ContainerCreating   0          2s

# 观察 Pod 数量
kubectl get pod
NAME                     READY   STATUS    RESTARTS   AGE
demo                     1/1     Running   0          6m57s
nginx-658567fdfd-4vnrn   1/1     Running   0          5s
nginx-658567fdfd-gzr4j   1/1     Running   0          5s
nginx-658567fdfd-lzjdc   1/1     Running   0          3m59s
nginx-658567fdfd-q6558   1/1     Running   0          5s

# 下面是在停止压测之后 Pod 数量的变化
kubectl get pod
NAME                     READY   STATUS    RESTARTS   AGE
demo                     1/1     Running   0          12m
nginx-658567fdfd-4vnrn   1/1     Running   0          5m44s
nginx-658567fdfd-lzjdc   1/1     Running   0          9m38s
kubectl get pod
NAME                     READY   STATUS    RESTARTS   AGE
demo                     1/1     Running   0          17m
nginx-658567fdfd-lzjdc   1/1     Running   0          14m
```

```sh
# 启动一个容器来进行压测
kubectl run demo --image=busybox -i --tty -- sh

while true;do wget -q -O- nginx; done;
```

一次 HPA 的时间

1. kubelet 每10秒钟抓取一次 Pods 的内存和CPU使用情况
2. MetricsServer 默认是每分钟会抓取一次会聚合 kubelet 的值
3. HPA 控制器检查指标并来决定扩缩容，默认检查间隔时间是 15 秒

所以在此情况下，一次 HPA 需要消耗的时间是 10+60+15 秒

但是这还不是最坏的情况，还有如下需要考虑的时间

集群节点需要扩容，假如集群容量不满足 HPA

镜像的下载需要时间

可以优化的点

规划好集群容量，尽量在 HPA 的时候不需要再去扩展集群节点

HPA 的时间减少，默认是 15秒，但是这个需要重新编译

降低 MetricsServer 的抓取时间，默认是60秒可以配置为15秒，参数是 metric-resolution

镜像预下载

```yaml
# behavior 配置是默认的，即如果不配置，会默认加上
behavior:
  scaleDown:
    # 需要缩容时先观察5分钟，如果一直持续需要缩容才执行缩容
    stabilizationWindowSeconds: 300
    policies:
    - type: Percent
      # 允许全部缩掉
      value: 100
      periodSeconds: 15
  scaleUp:
    # 需要扩容时，立即扩容
    stabilizationWindowSeconds: 0
    policies:
    - type: Percent
      value: 100
      # 每 15s 最大允许扩容当前 1 倍数量的 Pod
      periodSeconds: 15
    - type: Pods
      value: 4
      # 每 15s 最大允许扩容 4 个 Pod
      periodSeconds: 15
    # 使用以上两种扩容策略中算出来扩容 Pod 数量最大的
    selectPolicy: Max
```

```yaml
# 快速扩容
behavior:
  scaleUp:
    policies:
    - type: Percent
      value: 900
      # 这里的扩容过程为 1 ---> 10 ---> 100 ---> 1000
      # 没有配置缩容策略，默认是5分钟后开始缩容
      # 每 15s 最多允许扩容 9 倍于当前副本数
      periodSeconds: 15


# 快速扩容缓慢缩容
behavior:
  scaleUp:
    policies:
    - type: Percent
      value: 900
      # 每 15s 最多允许扩容 9 倍于当前副本数
      periodSeconds: 15
  scaleDown:
    policies:
    - type: Pods
      value: 1
      # 每 10 分钟最多只允许缩掉 1 个 Pod
      periodSeconds: 600
```

https://learnk8s.io/kubernetes-autoscaling-strategies

https://qingwave.github.io/k8s-hpa-enchance/

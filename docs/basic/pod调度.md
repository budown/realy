# Pod 调度

- 游戏服务全部 run 在 K8S 中
- 游戏在测试的时候需要调整时间, 来看游戏内的活动是否正常
- 所以需要有污节点, 让测试人员可以调整节点的时间

## node 污点

污点只用在 node 上, 作用就是拒绝不能容忍这些污点的 Pod 的运行

```sh
# node 污点的格式

kubectl explain node.spec.taints

taints <[]Object> # 污点对象列表
    effect <string> # 当 Pod 不能容忍这个污点的时候, 采取的动作
        NoExecute
        NoSchedule
        PreferNoSchedule
    key <string> # 键
    timeAdded <string>
    value <string> # 值

# 配置节点 $Nodename 为污节点, 键为 servername 值为 qa1 
kubectl taint node $Nodename servername=qa1:NoSchedule
```

一个 Pod 能不能运行在一个节点上, 需要 pods.spec.tolerations 列表中是否配置了 nodes.spec.taints

## Pod 污点容忍

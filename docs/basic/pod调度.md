# Pod 调度实践

https://awesome-kubernetes-notes.readthedocs.io/en/latest/awesome-kubernetes-notes.html#id96

- 游戏服务全部运行在 K8S 中
- 游戏在测试的时候需要调整时间, 来看游戏内发布的活动是否正常
- 那么久需要有污节点, 让测试人员可以调整污节点的时间以达到调整 Pod 的时间需求
- 如此一来，这个污节点就类似于原本所有游戏服务部署在一台单独的 ECS 上的场景

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

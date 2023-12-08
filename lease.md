# lease

配置示例：

```yaml
apiVersion: coordination.k8s.io/v1
kind: Lease
metadata:
  creationTimestamp: "2023-12-08T04:11:15Z"
  name: example
  namespace: default
  resourceVersion: "1568292"
  uid: 1b3b293f-f7dd-4810-9542-e2ed1937747c
spec:
  # 该 Lease 对象最后一次被获取的时刻，即最后一次选举的时刻
  acquireTime: "2023-12-08T06:22:48.270517Z"
  # 该 Lease 对象目前被谁持有
  holderIdentity: 4206b8ec-c6e0-450a-88e6-165b6cc22c62
  # 租约的有效时长
  leaseDurationSeconds: 1
  # 该 Lease 对象被转手了多少次 每次选举，如果新 leader 与旧 leader 不是同一个实例，则将该值加 1
  leaseTransitions: 10
  # 该 Lease 对象最后一次被刷新的时刻
  renewTime: "2023-12-08T06:22:48.270517Z"
```

```sh
➜ kubectl -n kube-node-lease get lease cn-beijing.172.31.98.42 -oyaml
apiVersion: coordination.k8s.io/v1
kind: Lease
metadata:
  creationTimestamp: "2023-10-10T06:18:34Z"
  name: cn-beijing.172.31.98.42
  namespace: kube-node-lease
  ownerReferences:
  - apiVersion: v1
    kind: Node
    name: cn-beijing.172.31.98.42
    uid: 1bfd2c6e-32fa-4883-8f61-a20128360f2a
  resourceVersion: "317010934"
  uid: e635f039-7bbf-4d48-bf43-5dac86216f82
spec:
  holderIdentity: cn-beijing.172.31.98.42
  leaseDurationSeconds: 40
  renewTime: "2023-12-08T08:17:07.433060Z"
➜
```

```sh
➜ kubectl -n kube-system get lease kube-scheduler -oyaml
apiVersion: coordination.k8s.io/v1
kind: Lease
metadata:
  creationTimestamp: "2022-09-20T09:25:28Z"
  name: kube-scheduler
  namespace: kube-system
  resourceVersion: "317014228"
  uid: bbf63e83-8742-44f6-ae80-e3c42436c021
spec:
  acquireTime: "2023-12-07T07:55:44.125981Z"
  holderIdentity: controlplane-ack-scheduler-6d89b7cb45-lqqcc_e76cf16c-7676-478f-bd7e-647bdd861fb1
  leaseDurationSeconds: 15
  leaseTransitions: 20
  renewTime: "2023-12-08T08:22:00.273130Z"
➜
```

https://leohsiao.com/DevOps/%E5%AE%B9%E5%99%A8/k8s/%E5%8E%9F%E7%90%86.html

https://isekiro.com/kubernetes%E6%BA%90%E7%A0%81-%E6%8E%A7%E5%88%B6%E5%99%A8-leader-%E9%80%89%E4%B8%BE%E6%9C%BA%E5%88%B6/#%E5%8E%9F%E7%90%86

https://xiaorui.cc/archives/7331

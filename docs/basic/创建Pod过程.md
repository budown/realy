# 创建 Pod 过程

https://github.com/jamiehannaford/what-happens-when-k8s/blob/master/zh-cn/README.md

用户通过命令行创建Pod

kube-apiserver经过对象校验、admission、quota等准入操作，写入etcd

kube-apiserver将结果返回给用户
同时kube-scheduler一直监听节点、Pod事件
kube-scheduler将spec.nodeName的pod加入到调度队列中，进行调度周期
kube-scheduler将pod与得分最高的节点进行binding操作
kube-apiserver将binding信息写入etcd
kubelet监听分配给自己的Pod，调用CRI接口进行Pod创建
kubelet创建Pod后，更新Pod状态等信息，并向kube-apiserver上报
kube-apiserver写入数据

---

kubectl

kubectl 会执行客户端验证，以确保非法的请求（例如，创建不支持的资源或使用格式错误的镜像名称）快速失败，并不会发送给 kube-apiserver，即通过减少不必要的负载来提高系统性能

验证通过后， Kubectl 开始构造它将发送给 kube-apiserver 的 HTTP 请求。在 Kubernetes 中，访问或更改状态的所有尝试都通过 kube-apiserver 进行，​​后者又与 etcd 进行通信。

在发送请求之前， Kubectl 需要先进行身份验证。用户凭据一般存储在 kubeconfig 文件中，比如 ~/.kube/config

最后一步发送 HTTP 请求

kube-apiserver

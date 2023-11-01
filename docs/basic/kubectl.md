# kubectl 命令

## 标签

```sh
# 查看标签
kubectl -n $ns get pod --show-labels

# 查看标签为 app=nginx 的 Pod
kubectl -n $ns get pod -l app=nginx

# 新增标签
kubectl -n $ns label svc nginx app=nginx

# 更新标签
kubectl -n $ns label svc nginx app=nginx2 --overwrite

# 删除标签
kubectl -n $ns label svc nginx app-
```

## 日志

```sh
# 查看 Pod 中的 container
kubectl -n $ns get pod $PodName -o jsonpath='{.spec.containers[*].name}'

# 查看 Pod 的日志 默认是第一个 container
kubectl -n $ns logs $PodName

# 查看 Pod 的日志 -f 参数类似于 tail 命令
kubectl -n $ns logs -f $PodName

# 最近 20 条日志
kubectl -n $ns logs -f $PodName -c $ContainerName --tail=20
```

## 集群管理

```sh
# 默认情况下， kubectl 命令从 $HOME/.kube/ 目录下找 config 文件

# kubeconfig 文件主要由三个部分组成，所以可以合并多个集群的 config 文件在一起
# clusters 集群
# users 用户
# context 上下文

# 查看所有的 context
kubectl config get-contexts

# 切换 context
kubectl config use-context $context_name

# 标记某个节点不可调度
kubectl cordon $NodeName

# 标记某个节点可调度
kubectl uncordon $NodeName

# 清空节点为了维护
kubectl drain $NodeName
```

## 其他常见动作

```sh
# 创建或者更新资源
kubectl apply -f $resource.yaml

# 创建资源
kubectl create -f $resource.yaml

# 显示详细信息
kubectl get pod(node, svc, deploy 等等) -o wide

# 描述资源，常用来 debug
kubectl describe pod $PodName

# 拷贝容器文件到本地
kubectl -n default cp $PodName:/etc/nginx/nginx.conf /tmp/nginx.conf
```

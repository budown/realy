# kubectl 命令

## 标签

```sh
# 查看标签
kubectl -n $namespace get pod --show-labels

# 查看标签为 app=nginx 的 Pod
kubectl -n $namespace get pod -l app=nginx

# 新增标签
kubectl -n $namespace label svc nginx app=nginx

# 更新标签
kubectl -n $namespace label svc nginx app=nginx2 --overwrite

# 删除标签
kubectl -n $namespace label svc nginx app-
```

## 日志

```sh
# 查看 Pod 中的 container
kubectl -n $namespace get pod $PodName -o jsonpath='{.spec.containers[*].name}'

# 查看 Pod 的日志 默认是第一个 container
kubectl -n $namespace logs $PodName

# 查看 Pod 的日志 -f 参数类似于 tail 命令
kubectl -n $namespace logs -f $PodName

# 最近 20 条日志
kubectl -n $namespace logs -f $PodName -c $ContainerName --tail=20
```

```sh
# 拷贝容器文件到本地
kubectl -n default cp $PodName:/etc/nginx/nginx.conf /tmp/nginx.conf
```

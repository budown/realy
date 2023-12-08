# K8S Disk

```sh
# lsblk -l
NAME MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
vda  253:0    0  120G  0 disk 
vda1 253:1    0  120G  0 part /

# df -h /
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1       118G   89G   25G  79% /

# du -sh /var/log/
24G     /var/log/

# 再具体看下哪些占用过高，可以看到系统日志和 Pod 的日志是可以清理一下的

# du -h /var/log/* | sort -rh | head -n 10
4.5G    /var/log/pods
4.5G    /var/log/messages-20231105
4.4G    /var/log/messages-20231112
3.5G    /var/log/messages-20231119
3.4G    /var/log/messages-20231126
2.0G    /var/log/journal/20220824141109585711773848340569
2.0G    /var/log/journal


# du -sh /var/lib/containerd/
62G     /var/lib/containerd/

# 可以基本上是容器镜像占用的

# du -h /var/lib/containerd/* | sort -rh | head -n 10
44G     /var/lib/containerd/io.containerd.snapshotter.v1.overlayfs/snapshots
44G     /var/lib/containerd/io.containerd.snapshotter.v1.overlayfs
18G     /var/lib/containerd/io.containerd.content.v1.content/blobs/sha256
18G     /var/lib/containerd/io.containerd.content.v1.content/blobs
18G     /var/lib/containerd/io.containerd.content.v1.content

# 查看所有镜像占用的磁盘空间大小，并不一定准确
crictl images | awk '{print $NF}'| awk -F'MB' '{print $1}' | awk 'BEGIN{sum=0}{sum += $1}END{print sum}'

# 查看悬空镜像占用的磁盘空间大小
crictl images | grep '<none>' | awk '{print $NF}'| awk -F'MB' '{print $1}' | awk 'BEGIN{sum=0}{sum += $1}END{print sum}'

# crictl images 
# 可以看到有悬空镜像，有历史镜像，我们可以清理的是悬空镜像和不在使用的历史镜像
IMAGE                                          TAG                         IMAGE ID            SIZE
xxx.cr.aliyuncs.com/xxx/apiserver              <none>                      af763b8aff63d       85MB
xxx.cr.aliyuncs.com/xxx/apiserver              latest                      e91a435357897       86.9MB
xxx.cr.aliyuncs.com/xxx/dashboard              latest                      2c398cfa6f9ec       54.5MB
xxx.cr.aliyuncs.com/xxx/dashboard              <none>                      8327f01f1b94d       54.5MB
xxx.cr.aliyuncs.com/xxx/controlplane-igame     latest                      1b727f6aa67be       88.9MB
xxx.cr.aliyuncs.com/xxx/controlplane           latest                      6504425fb3e9d       80.4MB
xxx.cr.aliyuncs.com/xxx/dashboard              latest                      16c573b963914       54.3MB
xxx.cr.aliyuncs.com/xxx/dashboard              v1.0.0                      483576c2800a9       54.3MB
xxx.cr.aliyuncs.com/xxx/dashboard              <none>                      1a8f2497f49e3       54.3MB
xxx.cr.aliyuncs.com/xxx/syncer                 <none>                      bd75b8158006e       87MB
xxx.cr.aliyuncs.com/xxx/syncer                 <none>                      478d306f1ef66       87MB
xxx.cr.aliyuncs.com/xxx/syncer                 <none>                      33fb80e0ac9e6       84.9MB
xxx.cr.aliyuncs.com/xxx/syncer                 latest                      1551a908ddbfb       86.9MB
xxx.cr.aliyuncs.com/xxx/syncer                 <none>                      cd7d335966011       87MB
xxx.cr.aliyuncs.com/xxx/usdk                   latest                      c6cb7fdbe4140       69.3MB
xxx.cr.aliyuncs.com/xxx/autotest-gui-dashboard latest                      e11c7e0a0c87a       71MB
xxx.cr.aliyuncs.com/xxx/arenasenior-gyp        <none>                      77cb7f22c3618       220MB
xxx.cr.aliyuncs.com/xxx/arenasenior-gyp        latest                      7e7a519c1148b       220MB
xxx.cr.aliyuncs.com/xxx/arena                  0.12.0.27820                30f1829f06601       212MB
xxx.cr.aliyuncs.com/xxx/arena                  0.12.0.28116                732c5a41b3333       212MB
xxx.cr.aliyuncs.com/xxx/arena                  0.12.0.30513                5bdb84b6a3d7b       212MB
xxx.cr.aliyuncs.com/xxx/arena                  v0.8.0.8339                 58d589adc8f53       159MB
xxx.cr.aliyuncs.com/xxx/arena                  v0.8.0.8578                 6e19d7378401e       159MB
```

悬空镜像

```sh
➜ cat > Dockerfile << EOF
> FROM alpine:latest
> ADD test.txt /data
> EOF

➜ echo aaa > test.txt

➜ docker build -t demo:v0.1 -f Dockerfile .

➜ docker images demo
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
demo         v0.1      7a95fc3d0a90   5 seconds ago   7.66MB

# 镜像名称一样，仅仅是将文件内容修改，就产生了悬空镜像

➜ echo bbb > test.txt
➜ docker build -t demo:v0.1 -f Dockerfile .

➜ docker images demo
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
demo         v0.1      814c4989c1ee   3 seconds ago   7.66MB

➜ docker images
REPOSITORY               TAG       IMAGE ID       CREATED          SIZE
demo                     v0.1      814c4989c1ee   7 seconds ago    7.66MB
<none>                   <none>    7a95fc3d0a90   48 seconds ago   7.66MB
```

清理

```sh
# 清理所有未使用的容器、网络、镜像(悬空和未引用的)、以及卷
docker system prune

# 单独删除悬空镜像
docker rmi $(docker images -f 'dangling=true' -q)

# containerd 

crictl images | grep '<none>' | awk '{print $3}' | xargs crictl rmi 
```

再来看下 kubelet 的驱逐

```sh
/usr/bin/kubelet \
...
...
--eviction-hard=imagefs.available<15%,memory.available<300Mi,nodefs.available<10%,nodefs.inodesFree<5% \
--system-reserved=cpu=150m,memory=2260Mi --kube-reserved=cpu=150m,memory=2260Mi \
...
...
```

kubelet 出于对节点的保护，在节点资源不足的情况下，会对节点上 Pod 进行驱逐

EvictionHard 表示硬驱逐，一旦达到阈值就直接驱逐，可以看到配置的驱逐信号

imagefs.available: 容器运行时用来存放镜像及容器可写层的文件系统的可使用容量

memory.available: 节点可用内存

nodefs.available: kubelet 使用的文件系统的可使用容量大小

nodefs.inodesFree: kubelet 使用的文件系统的可使用 inodes 数量

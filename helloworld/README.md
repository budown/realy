# realy

helm 是 K8S 的包管理工具，类似 CentOS 中的 yum 或者 Ubuntu 中的 apt ，做到了应用的快速部署

假设你部署一个应用，需要 deploy/configmap/service/ingress 这些对象，你可以都写进一个 yaml 文件中

然后通过 kubectl apply -f 来部署，如果你需要对应用进行升级或者回滚，就得有版控

假设你要部署的应用很多，那需要编辑和维护起来其实挺麻烦的

Chart: 一个 helm 包，包含了一组相关的 K8S 资源
Release: Chart 在 K8S 上的一个实例

```sh
# 安装
brew install helm

# 创建一个新的 Chart
helm create helloworld

# Chart 的目录结构
tree helloworld
helloworld
├── Chart.yaml
├── README.md
├── charts
├── templates
│   ├── NOTES.txt
│   ├── _helpers.tpl
│   ├── deployment.yaml
│   ├── hpa.yaml
│   ├── ingress.yaml
│   ├── service.yaml
│   ├── serviceaccount.yaml
│   └── tests
│       └── test-connection.yaml
└── values.yaml

# Chart.yaml: 用于描述这个 chart 包括名字、描述信息以及版本
# values.yaml: 用于存储 templates 目录中模板文件中用到的变量
# NOTES.txt: 用于部署该 chart 后介绍 chart 部署后的一些信息

# 打包
helm package helloworld
Successfully packaged chart and saved it to: /helloworld-0.1.0.tgz

# 部署一个 Chart
helm install helloworld helloworld-0.1.0.tgz

# 输出如下 这里的输出就是 templates/NOTES.txt 中定义的
NAME: helloworld
LAST DEPLOYED: Wed Dec 13 16:39:06 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=helloworld,app.kubernetes.io/instance=helloworld" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT

# 查看
helm ls
NAME      	NAMESPACE	REVISION	UPDATED                             	STATUS  	CHART           	APP VERSION
helloworld	default  	1       	2023-12-13 16:39:06.627873 +0800 CST	deployed	helloworld-0.1.0	1.16.0

# 修改 Chart.yaml 文件，将版本号从 0.1.0 改成 0.1.1 ，然后打包再发布
helm package helloworld
Successfully packaged chart and saved it to: /helloworld-0.1.1.tgz

# 更新
helm upgrade helloworld helloworld-0.1.1.tgz

# 查看
helm ls
NAME      	NAMESPACE	REVISION	UPDATED                             	STATUS  	CHART           	APP VERSION
helloworld	default  	2       	2023-12-13 16:40:19.520849 +0800 CST	deployed	helloworld-0.1.1	1.16.0

# 可以通过 helm history查看一个Release的多次更改
helm history helloworld
REVISION	UPDATED                 	STATUS    	CHART           	APP VERSION	DESCRIPTION
1       	Wed Dec 13 16:39:06 2023	superseded	helloworld-0.1.0	1.16.0     	Install complete
2       	Wed Dec 13 16:40:19 2023	deployed  	helloworld-0.1.1	1.16.0     	Upgrade complete

# 回滚 
helm rollback helloworld 1
Rollback was a success! Happy Helming!

#  使用 ls 查看，部署的 helloworld 的版本已经回滚到了 0.1.0
helm ls
NAME      	NAMESPACE	REVISION	UPDATED                             	STATUS  	CHART           	APP VERSION
helloworld	default  	3       	2023-12-13 16:42:06.447457 +0800 CST	deployed	helloworld-0.1.0	1.16.0

# 删除/卸载
helm uninstall helloworld
```

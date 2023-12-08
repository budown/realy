# ConfigMap

```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginxconfig
data:
  index.html: |
    <html>
    <body>
        <h1>Welcome to nginx changed......</h1>
    </body>
    </html>
  nginxconf: |
    user  nginx;
    worker_processes  auto;

    error_log  /var/log/nginx/error.log error;
    pid        /var/run/nginx.pid;

    http {
        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                          '$status $body_bytes_sent "$http_referer" '
                          '"$http_user_agent" "$http_x_forwarded_for"';

        access_log  /var/log/nginx/access.log  main;
        sendfile        on;
        keepalive_timeout  65;
        include /etc/nginx/conf.d/*.conf;
    }
```

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
        volumeMounts:
        - name: nginxconfig
          mountPath: /usr/share/nginx/html
          # subPath: index.html
      volumes:
      - name: nginxconfig
        configMap:
          name: nginxconfig
          items:
          - key: index.html
            path: index.html
```

```yml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

```sh
kubectl run curl-test --image=curlimages/curl -i --tty -- sh
```

安装 reloader

```sh
kubectl apply -f https://raw.githubusercontent.com/stakater/Reloader/master/deployments/kubernetes/reloader.yaml
```

自动更新

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    reloader.stakater.com/auto: "true"
```

指定更新

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    # 多个 ConfigMap 或者 Secret 需要用逗号隔开
    configmap.reloader.stakater.com/reload: "configmap_name"
```

# xx

```sh
➜ docker run -d --name=test_date nginx

➜ docker exec -it test_date date
Wed Dec  6 09:16:58 UTC 2023

➜ date
2023年12月 6日 星期三 17时17分07秒 CST
➜
```

```Dockerfile
FROM nginx
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

```sh
➜ docker build -t nginx_test_date -f Dockerfile .

➜ docker run -d --name=nginx_test_date nginx_test_date
9a9f51208801e4db73671175f7fb812ceae8148b6e8f90999cb2a4cbb2d14e96

➜ docker exec -it nginx_test_date date
Wed Dec  6 17:23:37 CST 2023

➜ date
2023年12月 6日 星期三 17时23分52秒 CST
```

```sh
➜ kubectl create configmap shanghai --from-file=/usr/share/zoneinfo/Asia/Shanghai

➜ kubectl apply -f nginx.yaml
deployment.apps/nginx created

➜ kubectl get pod
NAME                    READY   STATUS    RESTARTS   AGE
nginx-58b89cf8d-gndj6   1/1     Running   0          2s

➜ kubectl exec -it nginx-58b89cf8d-gndj6 date
Wed Dec  6 17:46:53 CST 2023

➜ date
2023年12月 6日 星期三 17时46分58秒 CST
```

https://qingwave.github.io/pod-timezone/

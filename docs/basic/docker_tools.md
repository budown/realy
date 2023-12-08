# on docker

```sh
docker run -d -p 3306:3306 --name mysql_local -e MYSQL_ROOT_PASSWORD=root mysql:latest

docker run -d -p 6379:6379 --name redis_local --requirepass 'root' redis:latest

docker run -d -p 2379:2379 -p 2380:2380 --name etcd_local --env ALLOW_NONE_AUTHENTICATION=yes bitnami/etcd

```

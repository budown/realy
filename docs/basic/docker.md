# Docker

```sh
docker run -d -p 3306:3306 --name mysql_local mysql:latest -e MYSQL_ROOT_PASSWORD=root
docker run -d -p 6379:6379 --name redis_local redis:latest --requirepass 'root'
```

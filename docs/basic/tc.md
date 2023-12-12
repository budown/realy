# TC

```sh
docker run -it --name=ubuntu_1 ubuntu:20.04 /bin/bash

apt update -y
apt install iproute2 net-tools iputils-ping -y

root@47d30928984c:/# tc qdisc add dev eth0 root netem delay 100ms
RTNETLINK answers: Operation not permitted

docker run -it --cap-add=NET_ADMIN --name=ubuntu_1 ubuntu:20.04 /bin/bash
```

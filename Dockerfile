FROM ubuntu:20.04

RUN apt update -y && apt install make git gcc -y

RUN git clone https://github.com/wolfcw/libfaketime.git && cd libfaketime && make && make install

RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN apt autoremove && apt clean

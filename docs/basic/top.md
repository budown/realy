# top

```sh
top - 07:39:12 up 320 days, 41 min,  2 users,  load average: 0.82, 1.28, 1.28
Tasks: 583 total,   1 running, 582 sleeping,   0 stopped,   0 zombie
%Cpu(s):  7.6 us,  1.5 sy,  0.0 ni, 90.1 id,  0.3 wa,  0.0 hi,  0.5 si,  0.0 st
KiB Mem : 48501280 total,  7234736 free, 24408068 used, 16858476 buff/cache
KiB Swap:        0 total,        0 free,        0 used. 23587656 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND                                                                                                               
   2512 root      20   0 3778840 219568  21692 S  57.5  0.5  32336:47 kubelet                                                                                                               
1034080 root      20   0 1047264 286780  11560 S  16.3  0.6 613:16.73 hero-herorank                                                                                                         
 183296 root      20   0  212.2g   3.3g  97716 S   9.0  7.2  18470:20 prometheus                                                                                                            
1858706 root      20   0  718036  23716   4436 S   4.3  0.0 640:06.23 node_exporter                                                            
```

```sh
09:14:56 ： 系统当前时间
264 days, 20:56 ： 系统开机到现在经过了多少时间
1 users ： 当前2用户在线
load average: 0.02, 0.04, 0.00： 系统1分钟、5分钟、15分钟的CPU负载信息

Tasks：任务;
87 total：很好理解，就是当前有87个任务，也就是87个进程。
1 running：1个进程正在运行
86 sleeping：86个进程睡眠
0 stopped：停止的进程数
0 zombie：僵死的进程数

Cpu(s)：表示这一行显示CPU总体信息
0.0%us：用户态进程占用CPU时间百分比，不包含renice值为负的任务占用的CPU的时间。
0.7%sy：内核占用CPU时间百分比
0.0%ni：改变过优先级的进程占用CPU的百分比
99.3%id：空闲CPU时间百分比
0.0%wa：等待I/O的CPU时间百分比
0.0%hi：CPU硬中断时间百分比
0.0%si：CPU软中断时间百分比

Men：内存的意思
8175320kk total：物理内存总量
8058868k used：使用的物理内存量
116452k free：空闲的物理内存量
283084k buffers：用作内核缓存的物理内存量

再下面就是进程信息：
PID：进程的ID
USER：进程所有者
PR：进程的优先级别，越小越优先被执行
NInice：值
VIRT：进程占用的虚拟内存
RES：进程占用的物理内存
SHR：进程使用的共享内存
S：进程的状态。S表示休眠，R表示正在运行，Z表示僵死状态，N表示该进程优先值为负数
%CPU：进程占用CPU的使用率
%MEM：进程使用的物理内存和总内存的百分比
TIME+：该进程启动后占用的总的CPU时间，即占用CPU使用时间的累加值。
COMMAND：进程启动命令名称
```

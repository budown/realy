# Linux 基础

一个文件的关于时间的信息，有三个：

- 最近访问时间 -atime 代表着最近一次访问文件的时间
- 最近修改时间 -mtime 代表着最近一次文件内容被修改的时间
- 最近状态修改时间 -ctime 代表着最近一次文件状态改变的时间

```sh
]# stat yum.log 
  File: ‘yum.log’
  Size: 53              Blocks: 8          IO Block: 4096   regular file
Device: fd01h/64769d    Inode: 396426      Links: 1
Access: (0600/-rw-------)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2023-08-07 19:27:01.803302848 +0000
Modify: 2023-09-14 06:15:01.388763744 +0000
Change: 2023-09-14 06:15:01.388763744 +0000
 Birth: -
```

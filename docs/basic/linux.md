# Linux 基础

时间

一个文件的关于时间的信息，有三个：

最近访问时间 -atime 代表着最近一次访问文件的时间
最近修改时间 -mtime 代表着最近一次文件内容被修改的时间
最近状态修改时间 -ctime 代表着最近一次文件状态改变的时间

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

```sh
# 5天之内 更改过
find / -type f -mtime -5

# 5天之前那一天 更改过
find / -type f -mtime 5

# 5天之前 更改过
find / -type f -mtime +5

# 60分钟以内
find / -mmin -60 -exec ls -l {} \;

# 比某个文件新的文件
find / -type f -newer file_name

# 不比某个文件新的文件
find / -type f ! -newer file_name
```

大小

```sh
# 找到文件大于 50M 并且小于 100M
find / -type f -size +50M -size -100M

# 0 字节的文件 也就是文件内容为空
find / -type f -empty
```

类型

```sh
# 目录类型
find / -type d

# 文件类型
find / -type f

# 连接文件
find / -type l

# socket文件
find / -type s
```

目录

```sh
# 找目录类型文件
find / -type d -print

# 排除 test 目录 找 log 文件
find / -path ./test -prune -o -name "*.log"

# 目录深度为 2 ，也就是找当前目录下，再往下的目录深度是 2 层
find / -path ./test -prune -o -name "*.log" -maxdepth 2
```

组合

find [path] [args] -exec [command] {} \;

[command] 是要执行的命令，{} 是一个占位符，是暂存了 find 命令的搜索结果

\; 是 [command] 命令的结束，在这里需要转义 ; 避免 shell 的解释，因此是固定写法

```sh
# 找文件并且列出来
find / -type f -exec ls -l {} \;

# 将 .json 后缀的文件扩展为 .bak 的文件
find / -name "*.json" -exec sh -c 'mv "$1" "${1}.bak"' _ {} \;
# 恢复上述动作
find / -name "*.bak" -exec sh -c 'mv "$1" ${1%.json.bak}.json' _ {} \;

# 删除 .log 后缀的文件
find / -name "*.log" -exec rm {} \;

# 同样的删除
find / -name xxx.json -delete

# 同样的删除
find / -name xxx.json | xargs rm
```

# Shell 基础

## Shell 数组中的[@] 和 [*]

```bash
arr1=(a)
arr1+=(b)
arr1+=(c)

echo $arr1 # a b c

# 数组所有元素

${arr1[@]}
${arr1[*]}

# 数组长度

${#arr[@]}
${#arr[*]}

# 数组Index

${!arr[@]}
${!arr[*]}
```

---

## find

### 时间

```bash
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

### 大小

```sh
# 找到文件大于 50M 并且小于 100M
find / -type f -size +50M -size -100M

# 0 字节的文件 也就是文件内容为空
find / -type f -empty
```

### 类型

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

### 目录

```sh
# 找目录类型文件
find / -type d -print

# 排除 test 目录 找 log 文件
find / -path ./test -prune -o -name "*.log"

# 目录深度为 2 ，也就是找当前目录下，再往下的目录深度是 2 层
find / -path ./test -prune -o -name "*.log" -maxdepth 2
```

### 组合

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

---

## sed

### 替换

```sh
# -i 直接编辑文件替换
sed -i 's/source_replace/targer_replace/g' filename

# -n 和 p 一起使用，只是显示被替换的那些行
sed -n 's/source_replace/targer_replace/p' filename

# 行首新加内容
sed -i 's/^/###/g' filename

# 行尾新加内容
sed -i 's/$/###/g' filename

```

### 删除

```bash
# 删除空白行
sed '/^$/d' filename

# 删除第几行
sed '2d' filename

# 删除第2行至末尾的所有行
sed '2,$d' filename

# 删除以demo开头的行
sed -i '/^demo/d' filename
```

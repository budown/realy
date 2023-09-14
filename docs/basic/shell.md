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

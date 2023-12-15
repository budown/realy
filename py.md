# py

```py
from rest_framework import viewsets
from rest_framework.decorators import action

# 默认视图中提供了 update/list/destroy/create 等动作
class MyViewSet(viewsets.ModelViewSet):

    # 但是你要想要新的动作 ，就使用 action 这个装饰器来自定义
    @action(methods=["GET"], detail=False)
    def create_dir(self, request):
        pass
```

```py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
```

- 给函数加装饰器

```py
import time
import functools

# 计算函数执行时间
def cal(func):
    # 装饰器没有传入参数
    def decorated():
        start = time.time()
        res = func()
        end = time.time()
        print(f"{func.__name__} run time = {end - start}")
        return res
    return decorated

@cal
def func1():
    print("func1")

@cal
def func1_1(a, b):
    print("func1_1 a=%s, b=%s" %(a, b))

func1() # 正常
func1_1(1, 2) # 错误 TypeError: cal.<locals>.decorated() takes 0 positional arguments but 2 were given

import time
import functools

# 计算函数执行时间
def cal2(func):
    @functools.wraps(func)
    # 装饰器传入函数参数
    def decorated(*args, **kwargs):
        start = time.time()
        res = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} run time = {end - start}")
        return res
    return decorated

@cal2
def func2(a, b):
    print("func2 a=%s, b=%s" %(a, b))

func2(1, 2) # 正常

import time
import functools

# 检查函数参数类型
def cal3(*types):
    def out(func):
        @functools.wraps(func)
        def decorated(*args, **kwargs):
            assert all([isinstance(_param, _type) for _param, _type in zip(args, types)])
            start = time.time()
            res = func(*args, **kwargs)
            end = time.time()
            print(f"{func.__name__} run time = {end - start}")
            return res
        return decorated
    return out

@cal3(int, int)
def func3(a, b):
    print("func3 a=%s, b=%s" % (a, b))


func3(1, 2) # 正常
func3(1, "2") # 错误 AssertionError
```

- 给类加装饰器

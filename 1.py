import time
import functools


def cal(func):
    # 没有参数
    def decorated():
        start_time = time.time()
        res = func()
        end_time = time.time()
        print(f"{func.__name__} run time = {end_time - start_time}")
        return res
    return decorated


def cal2(func):
    @functools.wraps(func)
    # 有参数
    def decorated(*args, **kwargs):
        start = time.time()
        res = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} run time = {end - start}")
        return res
    return decorated
# 检查参数类型


def cal3(*types):
    def out(func):
        @functools.wraps(func)
        def decorated(*args, **kwargs):
            assert all([isinstance(_param, _type)
                       for _param, _type in zip(args, types)])
            start = time.time()
            res = func(*args, **kwargs)
            end = time.time()
            print(f"{func.__name__} run time = {end - start}")
            return res
        return decorated
    return out


@cal
def func1():
    print("func1")


@cal
def func1_1(a, b):
    print("func1 a=%s, b=%s" % (a, b))


@cal2
def func2(a, b):
    print("func2 a=%s, b=%s" % (a, b))


# func1()
# func1_1(1, 2) # TypeError: cal.<locals>.decorated() takes 0 positional arguments but 2 were given
# func2(1, 2)


@cal3(int, int)
def func3(a, b):
    print("func3 a=%s, b=%s" % (a, b))


# func3(1, 2) # 正常
func3(1, "2") # 错误

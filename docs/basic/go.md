# Go

## Go 并发

并发：多线程程序在一个核 CPU 上运行，主要是由切换时间片来实现的”同时“运行

并行：多线程程序在多核 CPU 上运行，直接利用多核实现的多线程运行

Go 语言直接在语言层面内置了调度和上下文切换的机制

Go 语言的并发编程体现在 Goroutine 协程和 channel 通道的使用上

Goroutine 协程，是 Go 语言中的并发执行单位，是一种轻量级的协程，由 Go 运行时来调度和管理，与传统的线程协程相比，其开销很小

channel 通道，是 Goroutine 之间进行通信和数据共享的机制，提供了同步和互斥的功能，确保数据有序的传输和访问

Goroutine 是一个特殊的协程，和操作系统线程是多对多的关系

一个操作系统线程可以对应多个 Goroutine

Go 程序可以同时使用多个操作系统线程，是使得 Go 语言能够充分利用多核处理器的计算能力

Go 运行时调度器负责将多个 Goroutine 调度到少量的操作系统线程上执行，并处理他们之间的通信

## Go 并发示例

使用 sync.WaitGroup 确保并发协程完成

```go
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func main() {
	wg.Add(2)
	// 协程1
	go func() {
		defer wg.Done()
		demo("task 1")
	}()
	// 协程2
	go func() {
		defer wg.Done()
		demo("task 2")
	}()
	// 等待所有的协程完成
	wg.Wait()
}

func demo(name string) {
	for i := 0; i < 10; i++ {
		fmt.Println(name+"-->", i)
	}
}
```

使用 channel 实现协程并发

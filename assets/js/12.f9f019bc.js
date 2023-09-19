(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{292:function(_,v,l){"use strict";l.r(v);var t=l(14),i=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"从输入url到浏览器页面显示"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#从输入url到浏览器页面显示"}},[_._v("#")]),_._v(" 从输入URL到浏览器页面显示")]),_._v(" "),v("p",[_._v("这个问题总是在面试的时候被问到，其实就是八股文，但是可以由八股往深了去聊，还是能考验基础的")]),_._v(" "),v("h2",{attrs:{id:"概括来讲"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#概括来讲"}},[_._v("#")]),_._v(" 概括来讲")]),_._v(" "),v("ol",[v("li",[_._v("URL 解析")]),_._v(" "),v("li",[_._v("DNS 域名解析")]),_._v(" "),v("li",[_._v("TCP 建立连接")]),_._v(" "),v("li",[_._v("发送 HTTP 请求")]),_._v(" "),v("li",[_._v("服务器处理 HTTP 请求并响应 HTTP 请求")]),_._v(" "),v("li",[_._v("接收 HTTP 响应并下载资源然后渲染页面")]),_._v(" "),v("li",[_._v("TCP 关闭连接")])]),_._v(" "),v("p",[_._v("我们以 <www.google.com> 为例子具体来说")]),_._v(" "),v("h2",{attrs:{id:"dns-域名解析阶段"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#dns-域名解析阶段"}},[_._v("#")]),_._v(" DNS 域名解析阶段")]),_._v(" "),v("ol",[v("li",[_._v("浏览器会先看自身有没有这个域名的缓存，如果有就直接返回，没有就去问操作系统")]),_._v(" "),v("li",[_._v("操作系统中会对 DNS 解析结果有缓存，如果有就直接返回，如果没有就从 /etc/hosts 文件中找，有就返回，没有就真正开始去递归的问")]),_._v(" "),v("li",[_._v("客户端发出请求，问 <www.google.com> 的 IP 是啥，发送给本地的 DNS 服务器，也就是本机填写的 DNS 服务器地址，一般是在 /etc/resolv.conf 配置文件中")]),_._v(" "),v("li",[_._v("本地 DNS 收到请求后，先查询缓存中是否有对应的解析的缓存，如果没有，则去问根域名服务器")]),_._v(" "),v("li",[_._v("根域名服务器收到请求后，发现后缀是 .com，则返回 .com 顶级域名服务器的地址，让去问它")]),_._v(" "),v("li",[_._v("本地 DNS 收到顶级域名服务器的地址后，发出请求，问 <www.google.com> 的 IP 地址是啥，发送给顶级域名服务器")]),_._v(" "),v("li",[_._v("顶级域名服务器收到请求后，返回 google.com 这个权威域的服务器地址，让去问它")]),_._v(" "),v("li",[_._v("本地 DNS 收到权威域名服务器的地址后，发出请求，问 <www.google.com> 的 IP 地址是啥，发送给权威域名服务器")]),_._v(" "),v("li",[_._v("权威域名服务器收到请求后，查到并返回对应的 IP 地址给本地 DNS")]),_._v(" "),v("li",[_._v("本地 DNS 收到返回，发送给客户端，并本地缓存")])]),_._v(" "),v("h2",{attrs:{id:"tcp-建立连接阶段"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#tcp-建立连接阶段"}},[_._v("#")]),_._v(" TCP 建立连接阶段")]),_._v(" "),v("ol",[v("li",[_._v("开始的时候，服务器端会监听某个端口，处于 LISTEN 状态")]),_._v(" "),v("li",[_._v("客户端主动发起建立连接发送 SYN ，状态是 SYN_SENT")]),_._v(" "),v("li",[_._v("服务器端收到请求，返回 SYN+ACK ，状态是 SYN_REVD")]),_._v(" "),v("li",[_._v("之后客户端再发送 ACK ，状态是 ESTABLISHED ，服务端收到 ACK ，状态也是 ESTABLISHED")])]),_._v(" "),v("p",[_._v("发送 HTTP 请求")]),_._v(" "),v("ol",[v("li",[_._v("HTTP 的请求报文包含：请求行，请求头，空行，请求正文")]),_._v(" "),v("li",[_._v("请求行：请求的方式 GET/POST 等，请求的资源名称 URL 以及使用的 HTTP 协议的版本")]),_._v(" "),v("li",[_._v("请求头：描述客户端请求哪个主机及其端口，已经客户端的一些环境信息等")]),_._v(" "),v("li",[_._v("空行： \\r\\n")])]),_._v(" "),v("h2",{attrs:{id:"服务端响应-http-请求"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#服务端响应-http-请求"}},[_._v("#")]),_._v(" 服务端响应 HTTP 请求")]),_._v(" "),v("ol",[v("li",[_._v("HTTP 响应包含：状态行、响应头、空格、消息体")]),_._v(" "),v("li",[_._v("状态行：协议版本、状态码、状态码描述")]),_._v(" "),v("li",[_._v("响应头：用于描述服务器的基本信息，以及客户端如何处理数据")]),_._v(" "),v("li",[_._v("空格： CRLF (\\r\\n) 分割")]),_._v(" "),v("li",[_._v("消息体：服务器返回给客户端的数据")])]),_._v(" "),v("h2",{attrs:{id:"关闭-tcp-连接"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#关闭-tcp-连接"}},[_._v("#")]),_._v(" 关闭 TCP 连接")]),_._v(" "),v("ol",[v("li",[_._v("客户端发送 FIN 报文，状态变为 TIME_WAIT_1")]),_._v(" "),v("li",[_._v("服务端收到报文后，向客户端发送 ACK 应答报文，状态变为 CLOSE_WAIT")]),_._v(" "),v("li",[_._v("客户端收到 ACK 应答报文后，状态变为 TIME_WAIT_2")]),_._v(" "),v("li",[_._v("服务端也向客户端发送 FIN 报文，状态变为 LAST_ACK")]),_._v(" "),v("li",[_._v("客户端收到服务端的 FIN 报文，应答 ACK ，状态变为 TIME_WAIT")]),_._v(" "),v("li",[_._v("服务端收到 ACK 应答报文后，状态进入 CLOSE ，服务端关闭连接")]),_._v(" "),v("li",[_._v("客户端在 2MSL 时间后，状态进入 CLOSE ，客户端关闭连接")])]),_._v(" "),v("p",[_._v("所以为啥关闭 TCP 连接需要4次握手")]),_._v(" "),v("ol",[v("li",[_._v("客户端向服务端发送 FIN 报文时，仅仅表示客户端不再发送数据了但是还能接收数据")]),_._v(" "),v("li",[_._v("服务端收到客户端的 FIN 报文时，回一个 ACK 应答报文，而这个时候服务端可能还有数据需要处理和发送")]),_._v(" "),v("li",[_._v("等服务端不再发送数据时，才发送 FIN 报文给客户端来表示同意现在关闭连接")])])])}),[],!1,null,null,null);v.default=i.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{291:function(e,r,t){"use strict";t.r(r);var u=t(14),s=Object(u.a)({},(function(){var e=this,r=e._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"create-pod"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#create-pod"}},[e._v("#")]),e._v(" create pod")]),e._v(" "),r("p",[e._v("用户通过命令行创建Pod")]),e._v(" "),r("p",[e._v("kube-apiserver经过对象校验、admission、quota等准入操作，写入etcd")]),e._v(" "),r("p",[e._v("kube-apiserver将结果返回给用户\n同时kube-scheduler一直监听节点、Pod事件\nkube-scheduler将spec.nodeName的pod加入到调度队列中，进行调度周期\nkube-scheduler将pod与得分最高的节点进行binding操作\nkube-apiserver将binding信息写入etcd\nkubelet监听分配给自己的Pod，调用CRI接口进行Pod创建\nkubelet创建Pod后，更新Pod状态等信息，并向kube-apiserver上报\nkube-apiserver写入数据")]),e._v(" "),r("hr"),e._v(" "),r("p",[e._v("kubectl")]),e._v(" "),r("p",[e._v("kubectl 会执行客户端验证，以确保非法的请求（例如，创建不支持的资源或使用格式错误的镜像名称）快速失败，并不会发送给 kube-apiserver，即通过减少不必要的负载来提高系统性能")]),e._v(" "),r("p",[e._v("验证通过后， Kubectl 开始构造它将发送给 kube-apiserver 的 HTTP 请求。在 Kubernetes 中，访问或更改状态的所有尝试都通过 kube-apiserver 进行，​​后者又与 etcd 进行通信。")]),e._v(" "),r("p",[e._v("在发送请求之前， Kubectl 需要先进行身份验证。用户凭据一般存储在 kubeconfig 文件中，比如 ~/.kube/config")]),e._v(" "),r("p",[e._v("最后一步发送 HTTP 请求")]),e._v(" "),r("p",[e._v("kube-apiserver")])])}),[],!1,null,null,null);r.default=s.exports}}]);
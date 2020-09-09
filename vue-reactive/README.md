### 数据的响应式原理

>  在vue3的api中，我们能发现 `reactive` `watchEffect` 的api暴露出来，它们配合能够实现数据的响应式, 看起来基本和mobx的使用方法基本是一致的。

> 实际上 vue3 Composition 就是从原来vue2的实际代码上抽离了出来

![s](https://cn.vuejs.org/images/data.png)

1. 首先对视图中的数据进行劫持(把每个数据都劫持处理)
2. 每个属性都会生成一个dep对象,每个属性的 `get` 方法负责添加依赖视图更新，`set` 方法负责通知视图更新
3. 在vue中，需要遍历视图中的属性进行依赖收集，此时此刻 activeUpdate (`watcher`) 添加到dep中
4. 所以访问每个属性都能够触发`dep.depend` 进行依赖收集，每个属性上的dep类上都有 activeUpdate (`watcher`) 
5. 每次属性的修改都能执行dep.notify方法。

- 实现一个Dep
- 实现一个observer
- 实现一个autoRun



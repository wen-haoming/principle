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

```js
function isObject(obj){
    if(typeof obj === 'object' && !Array.isArray(obj) && obj !== null && obj !== undefined ){
        return true
    }else{
         return false
    }
}

class Dep{ // 每个属性都有自己的dep实例
    constructor(){
       this.subscribers = new Set()
    }
    depend(){ // 每次对属性执行get方法都会收集视图更新依赖
        if(activeUpdate){
            this.subscribers.add(activeUpdate)
        }
    }
    notify(){ // 属性变化，自动更新视图
        this.subscribers.forEach(fn=>fn())
    }
}

function observer(obj){
      if(!isObject(obj)){
          throw new TypeError(obj)
      }
    Object.keys(obj).forEach(key=>{
      let val = obj[key]
      let dep = new Dep()
       if(isObject(val))return observer(val)
       Object.defineProperty(obj,key,{
           get(){
               dep.depend() // 收集依赖
               return val
           },
           set(newVal){
               let isChange = val !== newVal
               if(isChange){
                    val = newVal
                    dep.notify() // 视图更新
               }
           }
       })
    })
}

let activeUpdate = null // 把视图更新方法和dep类连接的桥梁

function autoRun(fn){
    function wrapperUpdate(){
        activeUpdate = wrapperUpdate // 提前把更新方法暴露出去
        fn() // 自动执行了依赖属性的get方法
        wrapperUpdate = null
    }
    wrapperUpdate()
}

```

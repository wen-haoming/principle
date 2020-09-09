function isObject(obj){
    if(typeof obj === 'object' && !Array.isArray(obj) && obj !== null && obj !== undefined ){
        return true
    }else{
         return false
    }
}

class Dep{
    constructor(){
       this.subscribers = new Set()
    }
    depend(){
        if(activeUpdate){
            this.subscribers.add(activeUpdate)
        }   
    }
    notify(){
        this.subscribers.forEach(fn=>fn())
    }
}



function reactive(obj){
      if(!isObject(obj)){
          throw new TypeError(obj)
      }
    Object.keys(obj).forEach(key=>{
      let val = obj[key]
      let dep = new Dep()
       if(isObject(val))return reactive(val)
       Object.defineProperty(obj,key,{
           get(){
               dep.depend()
               return val
           },
           set(newVal){
               let isChange = val !== newVal
               if(isChange){
                    val = newVal
                    dep.notify()
               }
           }
       })
    })
}

let activeUpdate = null

function watchEffect(fn){
    function wrapperUpdate(){
        activeUpdate = wrapperUpdate
        fn()
        wrapperUpdate = null
    }
    wrapperUpdate()
}
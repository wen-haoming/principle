
/**
 *  深度克隆
 * 拷贝Symbol
 * 循环引用导致递归爆栈
 */

let obj = {
    [Symbol('name')]: 'John',
    a1:{
        b1:{
            c1:{
                val:'cc'
            }
        }
    },
    a2:{
        b2:{

        }
    }
}

obj.obj = obj

function deepClone(deepObj){

    let map = new WeakMap(); // 用WeakMap来存储，能够避免递归问题

    function dp(obj){
     if(obj === null || typeof obj === 'undefined' ) return 
     let getVal = map.get(obj)

     if(getVal){
        return getVal
    }

    let resObj =  Array.isArray(obj)?[]:{}

    map.set(obj,resObj)

    for(let key of Reflect.ownKeys(obj)){ // 使用ownKeys能够分辨出Symbol属性
        let val = obj[key]
          if(typeof val === 'object' && val !== null ){
            resObj[key] =  dp(val) 
          }else{
            resObj[key] = val
          } 
    }
    
    return resObj
    }
    
    return dp(deepObj)
}

console.log((deepClone(obj)))
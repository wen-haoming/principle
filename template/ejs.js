let fs = require('fs')
let path = require('path')
let ejs = require('ejs')

let resolve = (src)=>path.resolve(__dirname,src)

let str = fs.readFileSync(resolve('./index.html'),'utf-8')

function render(str,obj){
    str = str.replace(/<%=([\s\S]+?)%>/g,($,$1)=> '${'+$1+'}' ) // 首先过滤全部<%=xx%> 成为 ${xx}
    // 拼接字符串

    let head = `let str = '';\r\n` // 定义全局变量
        head += `with(obj){ \r\n` // 定义当前作用域需要使用到with的特性

    let content = 'str += `' // html都是整个content

   content += str.replace(/<%([\s\S]+?)%>/g,($,$1)=>{
         return '`\r\n' + $1 +'\r\nstr+=`'
    }) // 把全部
    
   let tail  = '`\r\n} return str ' 
   let scriptStr =  head+  content+tail
    let fn = new Function('obj',scriptStr)
    return fn(obj)
}

let  ejsStr2 =  render(str,{
    name:'<h1>123</h1>',
    arr:[1,2,3,4,5,6]
})





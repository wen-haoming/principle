## 如何实现一个模板引擎

> 有时候我们使用模板引擎会觉得很神奇，能够自动替换并且执行内部的js代码, 这次我们来一起实现它的基本原理。

<<<<<<< HEAD
- 基于ejs的接口形式,实现一个模板引擎。
- 基于es6模板字符串,简单实现一个(高性能)模板引擎。
- 实现xss过滤功能

### 基于ejs的接口形式,实现一个模板引擎
=======
- 基于ejs的接口形式,实现一个模板引擎
- 基于es6模板字符串,简单实现一个模板引擎
>>>>>>> 2a09b6f6f349a03a7b1d7aee340a92a0431e67a6

其实模板引擎主要核心是我如何让一个字符串去执行, 并且我的变量能够传入到模板的执行上下文。所以需要借助如何两个

- new Function 传入字符串，能够返回一个函数，详细请看 [mdn](https://developer.mozilla.org/zh-CN/docs/Glossary/Function)
- with 方便插值，能够引入我当前变量到里面作为执行上下文，详细请看 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)

### 借助es6的特性,使用模板语法去实现一个模板引擎

- newFunction || vm.runInNewContext
- xss过滤
- include子模板



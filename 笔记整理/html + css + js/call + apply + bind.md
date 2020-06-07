`call + apply + bind`

实现原理，就是把执行环境当成是对象，把函数当成是对象的属性，调用完之后删除；

```javascript
var a = function (){console.log(this)}
var b = {
    stu:"abc",
    foo:a,
}
foo.call(b)  就相当于是  b.foo()
```

`call`的原理

```javascript
Function.prototype.myCall = function(context){
	context = context || window;
	//创建一个对象的属性，并且把执行函数的作用域保存进来
    context.fn = this;
    const result = context.fn(...[...arguments].slice(1));
    delete context.fn;
    return result;
}
```

`bind : `

```javascript
Function.prototype.myBind = function(context){
    context = context || window;
    const _this = this;
    const args = [...arguments].slice(1);
    const result = function(){
        return _this.apply(context,[...args,...arguments]);
    }
    return result
}
```

`call`和`apply`只是传入的参数不一样而已，前者是一个一个传，后者是传入一个数组；
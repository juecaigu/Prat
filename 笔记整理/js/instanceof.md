原型链：

var a =  new Foo()

`a._proto_ = Foo.prototype`

`Foo._proto_ = Function.prototype`

`Foo.prototype._proto_ = Object.prototype`

`Object.prototype._proto_ = null`



`instanceof`是去原型链上查找，就是判断左边的原型链上有没有右边的原型

```javascript
function my_instanceof(left,right){
    let leftValue = left.__proto__;
    let rightValue = right.prototype;
    while(true){
          if(leftValue === null){
             	return false;
             }else if(leftValue === rightValue){
                      	return true;
                      }
          leftValue = leftValue.__proto__;
          }
    left.__proto__ = right.prototype;
}
```

实现一个`new`：

> * 新建一个空对象；
> * 把构造函数的作用域赋值给该对象；
> * 执行函数里面的内容；
> * 返回该对象

```javascript
function my_new(){
    let obj = {};
    const constructor = Array.prototype.shift.call(arguments);
    obj._proto_ = constructor.prototype;
    return obj;
}
```

引申出的知识点： 作用域 + `this`指向 + 原型链

let const var 区别  -->  前两者会传入一个块级作用域的概念；

为什么在新的作用域中的变量就是新的，因为每当一个作用域结束的时候，垃圾回收机制就会把变量回收，全局作用域的变量不回收，闭包里面，能够在全局访问到的变量不会回收； --> 可扩展的东西很多；

如果直接用原始类型的值去比较的话 会返回`false`;但是用`Number`构造函数去创建一个数字的时候 `instanceof object`是返回的`true`

```javascript
var a = 123;
var b = new Number(123);
a instanceof Object -- false
b instanceof Object -- true
```

原因是`123`其实也是通过构造函数生成的，叫做基本包装类对象；所以字符串可以直接使用对象原型上的方法；但是每次使用完之后就会让其转换成`null`

```javascript
var a = "zifuchuan"
//相当于
var a = new String(zifuchuan);
a.slice(0,1)
a = null;
```

所以其实a只存在于定义的那一行；
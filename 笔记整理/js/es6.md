# **ES6**

ecmascript 是语言标准

javascript 是运行在浏览器的语言；

### 1、变量声明的问题；

**用var 声明变量：**

1、允许重复的变量声明，数据容易被覆盖

2、变量提升    会导致逻辑混乱 闭包问题

3、全局变量会挂到全局对象上，导致里面的方法被污染；

**块级作用域：**遇到花括号就会创建一个块级作用域；花括号结束跨及作用域就消失

**let 声明变量**：  

1、在同一作用域内是不能出现重复的声明；

2、声明的变量不会挂载到全局对象上

3、变量不会提升（但是访问的时候报错并不是 a is not defined）

因为实际上会提升，但是会放入一个“**暂时性死区**”，访问里面的内容会报错，然后

执行到声明语句的时候会把它从这个区域内拿出来；

**const 声明变量**：

与let一致，区别是const声明的时候必须初始化，且不能改变；

1、注意的是不可变的是内存空间不可变，但是内存空间中地址指向的其他空间是可以改变的；

```javascript
 const a =1;//如果后面改变a的值会报错；
        const b = {
            name:"21",
            age:"12"
        }
        b.name = "abgiwe";//const 声明的时候b的地址不变，但是指向的空间变了；
        for（const prop in b ）{
            console.log(prop)
        }//for in 循环的变量可以用const定义，里面改变prop的值也是可以的；
```

2、如果变量的名字可以判断出是不会改变的常量（比如圆周率），需要全部大写并且不同单词之间用下划线分开；

### 2、字符串的实例方法

includes（“a”，index）  查找是否有字符串，index表示查找开始位置；

startWidth（“”，index） 查找是否存在以指定字符串开头的

endsWidth（“”，index）查找是否以指定字符串结尾的

repeat（num）把字符串重复执行指定的次数；

### 3、正则新增的匹配模式

y 表示从lastIndex开始匹配；正则的默认lastIndex是0；

### 4、字符串模板

>   用 `` 可替换引号，写多行字符串可以直接敲回车
>
> `` 要拼接 js的表达式可以增加 ${}  花括号里面写js的表达式；

**字符串模板标记：**

```javascript
const test = String.raw`hga\awke\n`//后面的字符串不会被转义符号影响
        const test2 = myFn`gaej${a}`//myFn表示自定义的函数，相当于执行这个函数
                                    //函数的参数；第一个是被插值分割的字符串数组
                                    //          后面就是各项插值；
        myFn(["gaej",""],a);
```

### **5、函数**

函数参数,可以直接在形参里面定义默认值

```javascript
const func = function(a,b=1,c=2){  //默认值可以是其他表达式 比如函数
return a+b+c
}
console.log(func(1)) // 4
console.log(fung(1,2,3)) //6
```

#### 1、 剩余参数

用来收集剩余的形参，形成一个数组；

注意点：一个函数只能有一个剩余参数；剩余参数必须是最后一个；

```javascript
function test(a,b,...arg){       console.log(...arg)     }     //剩余参数用来解决传入的参数不固定，格式为 ...参数名;
```

剩余参数是形参；

**展开运算符**------形式跟剩余参数一致，但是是实参（会把传入的参数展开成参数）；

可以展开对象，也可以展开数组；

利用展开运算符进行克隆

```javascript
const obj1 = {
name:"deng",
age:12,
address:{
province:"zhejiang"
}
}
const obj2 = {
...obj1,//这里只用展开的话address是克隆的地址，所以要重新定义一个对象，进行深度
address:{
...obj1,address
}
}
```



函数珂理化--用来固定重复使用的参数的

```javascript
function cal(a,b,c,d){
return a+b*c-d
}
var curry = function(func,...args){
return function(...subArr){
const allArr = [...args,...subArr]
if(allArr.length >= func.length){ //函数的length可以获取形参的个数
return func(...allArr)
}else{
return curry(func,...allArr)
} 
}
}
var newCal = curry(cal,1,2)//把1和2参数固定下来
console.log(newCal(3,4))
console.log(newCal(5,6,7))
console.log(newCal(8))
```

#### 2、明确函数的调用方式；

ES6里面有一个API------ **new.target**

如果函数是用new 来调用函数，会返回该函数;如果没有用new 则返回undefined；

#### 3、箭头函数；

箭头函数是一个函数表达式（不是函数声明）

（）=> {函数体}      只有一个参数的情况下可以省略小括号

如果函数只有一条返回值（如果是对象等，可以用小括号括起来）的语			

句，可以省略大括号；

箭头函数规定了this  ，不管调用函数的是对象还是什么，this指向定义this时候的对象；

>  **箭头函数里面没有this，arguments，new.target；如果写了的话，就是外层函数的this，arguments和new.target**
>
> **箭头函数没有prototype，所以不能用于构造函数创建对象**

### **6、对象**

#### **1、对象速写**

字面量初始化对象，成员的名称来自一个变量，且名称相同，可以省略‘

```java
//简化了字面量对象的写法
    const creat = function (a,b,c){
        return {
            a,
            b,
            c
        }
    }
    //等价于
    const creat = function(a,b,c){
        return {
            a:this.a,
            b:this.b,
            c:this.c
            func(){},
        }
    }
```

#### **2、速写方法；**

字面量初始化对象，方法可以直接把：和function省略;就好比上面例子中的func

#### **3、计算属性名**

字面量初始化对象，属性名来自一个变量，那么可以写成中括号的形式

```javascript
const prop1 = "name";
    const prop2 = "age";
    const obj = {
        [prop1]:"aaa",
        [prop2]:111,
    }
```

#### 4、新增的API

这里的Object是一个函数，用于生成一个object对象

Object.is（）相当于全等  但是 NaN 会相等；

Object.assign() 混合对象    ------Object.assign(obj1,obj2)把obj2覆盖到obj1 并且返回obj1

Object.getOwnPrototypeNames() ------返回属性名 形成的数组，会有排序（先排数组，后排其他）

Object.setPrototypeOf()修改隐式原型    Object.setPrototypeOf(obj1,obj2) == obj1._proto_ = obj2

#### 5、关于类

```javascript
  //类的写法---里面的代码是在严格模式下
    class Ainmal {
        constructor (name,age,type,sex){
            this.name=name,
            this.age=age,
            this.type=type,
            this.sex = sex
        }
        get age(){
            return this._age
        }
        //通过set方法可以动态控制age  es5 中可以用object.definedPrototype设置set
        set age(age){
            if(typeof age != "number"){
                age = 0
            }
            if(age < 0){
                age = 0;
            }else if(age > 200 ){
                age = 200;
            }
            this._age=age;
        }
        //方法会直接写到原型当中
        print(){
            console.log(this.name)
        }
        //静态成员------不需要new Ainmal 就可以直接调用；是存在构造函数里面的静态属性
        //创建的静态成员在new Ainmal实例对象中访问不到
        static width = 100;
        static menthod(){};
    }
    const a = new Ainmal();//必须用new关键词调用
    //不会遍历原型上的方法------按照之前的构造函数会遍历原型上的方法；
    for(prop in a){
        console.log(prop);
    }
```

继承

关键字 extends  和super

```javascript
 class Man extends Person{
        constructor(a,b,c){   //子类的参数     //constructor 之后必须调用super
            super(name,age,sex)    // 父类的构造器，父类的实参           
        }
        print(){
            //会覆盖父类的方法；
            super.print()//super 如果用对象使用的话，代表父类的原型（相当于把父类的print里面的方法放到这里）
            console.log("Man")    //------定义子类私有的print方法语句
        }
    }
```

#### **6、解构**

```javascript
let user = {
            name:"users",
            age:11,
            sex:"man"，
            province:{
                city:"shanghai"
            }
        }
        //之前调用user对象里面的属性要一个个访问
        let name = user.name;
        let age = user.age;
        let sex = user.sex;
        //使用解构之后------解构不会对原始对象造成影响
        let name1,age1,sex1;
        ({name1,age1,sex1}=user)
        //同时也可把let写一起（顺序是先声明里面的变量再解构）
        let {name1,age1,sex1} =user
        //非同名属性解构
        let {name1,age1,sex1:gender} = user//sex1是user中的属性，gender是不同的结构名
        console.log(name1,age1,gender);
        //进一步解构
        let{name1,age1,sex1,province:{city}}------pronvice不会被赋值，是给city赋值
```

数组也可以解构

let [] = numbers

let [1,2,,,,4] = numbers------中间值不需要的写空格

 let a = 1; let b = 2;     //交换ab的值     [b,a] = [a,b]

如果从一个undefined或者null中解构会报错，所以就给它默认添加一个空对象；

#### **7、符号**

const syb1 = Symbol（'这是一个符号'）      里面可以传入描述

符号具有以下特点：

1、没有字面量--只能用Symbol()函数创建

2、使用typeof方法返回的是symbol

3、通过symbol符号得到的都是不相等的；

4、符号可以作为属性名存在，这种属性称之为符号属性（以前的属性名都是字符串）

5、符号属性是不可枚举的      可以通过Object。getOwnPrototypeSymbols（）方法得到

6、符号是不可以隐式转化的，但是可以显示转换成字符串；

用途：创建一个私有变量，外面访问不到；

```javascript
let syb = Symbol()
const obj = {
    a:"name",
    age:12,
    [syb]:这是一个符号属性 //syb用计算属性
}

const hero = (function(){
    const syb = Symbol();
    return {
    name:"abc",
    [syb](){      //该方法只能在内部使用
        return "abc"
    }
    }
})()
const syb = Symbol()  //这个跟里面的syb是不一样的
hero[syb] //使用不了改方法
```

**共享符号**：Symbol.for（“符号名称”） 符号名称一致的时候就是共享的符号；

sby1 = Symbol.for("abc") sby2 = Symbol.for("abc") sby1 === sby2 //true

#### **8、事件循环和Promise**

##### 1、执行栈；

call stack 一个数据结构，用于存放各种函数的执行环境（执行上下文），每一个函数执行之前都会把相关信息加入到执行栈；函数调用之前会创建执行环境，然后加入到执行栈；函数调用之后，销毁执行环境；

栈先加入的数据放在最下面，出栈的时候最上面的数据先出；

**注意：Js引擎执行的永远是执行栈的最顶部；**

```javascript
function a(){
    console.log("a");
    b()
}
function b(){
    console.log("b");
    c();
}
function c(){
    console.log("c")
}
a();

1、先创建a的上下文，执行a里面的代码；
2、a里面有log上下文，还有b函数的上下文，添加b的上下文；
3、b函数里面还有c的上下文；
4、c函数里面有log上下文，然后执行，然后消除c的上下文，然后消除b的上下文，最后消除a的上下文；
```

执行栈 ------浏览器宿主

   |

   |

   |

事件队列

![image-20200610095850120](https://i.loli.net/2020/06/10/JfHWbvp6ikKu3dz.png)

浏览器宿主会将监听的时间加入到事件队列里面，然后**执行栈清空的时候会将事件队列里面的第一个函数加入到执行栈中去执行**；

Js引擎对事件队列的取出执行方式，以及宿主环境的配合，叫做**事件循环**；

事件队列有两个队列；宏队列 和 微队列 ;只有微队列执行完成之后才会执行宏队列；

>  常见的微队列：`promise  mutation回调  `  常见的宏任务:`dom事件回调 定时器 ajax回调`

**------注意：异步会有一个事件队列**

**同步事件处理完了之后才会去处理异步事件队列里面的；根本原因是js是单线程的**

之前的异步处理会形成两个问题：

1、回调地狱

2、异步事件之间的联系

##### **2、Promise模型：**

事件分为两个阶段：

1、unsettled ：未决阶段------表示事情还在处理之前的事情，还没有发生通向结果的那件事情

2、settled：已决阶段------表示已经发生了，有一个结果

事情总是从未决阶段逐渐过渡到已决阶段的，未决阶段有控制何时通向已决阶段的能力

事件分为三个状态：

1、pending------挂起状态；在未决阶段

2、resolved------解决状态：在已决阶段

3、rejected------拒绝状态：在已决阶段；

把pending 状态推向 resolved或者rejected状态的称为resolve 或 reject

**当到达已决状态的时候，会进行后续的事件处理；不同状态的已决会有不同的后续处理**

resolved-----thenable

rejected------catchable	

如果后续处理比较多就会产生队列；作业队列里面的任务是异步的

**整个模型就是Promise      如图**

![image-20200610095724734](https://i.loli.net/2020/06/10/pFMaQyXvCIwfe6b.png)

**注意**------Promise并没有消除回调，只是变得可控；

**Promise**

```javascript
const pro = new Promise((resolve,reject)=>{
        //处理未决状态下的函数
        //resolve会把函数推向已决阶段的resolved状态
        //reject会把函数推向已决阶段的rejected状态
        setTimeout(function(){
            resolve(123);
        },3000)
    })
    //pro.then方法
    pro.then(data=>{
        //data为状态参数
        //如果当前的Promise的状态为resolved ，立即执行
        //如果当前的Promise的状态为未决阶段，先放到作业队列，然后等
        //状态为resolved时立即执行；
    },err=>{

    })
    pro.catch(err=>{})//可以通过catch方法单独添加catchable函数
    //需要注意的
    //1、未决阶段的函数都是同步的，会立即执行
    //2、thenable和catchable函数是异步执行的，就算立即执行也是加入到事件队列里面（微队列）
    //3、一旦状态确定，就不可以改变
    const p = new Promise((resolve,reject)=>{
        console.log("a");
        setTimeout(function(){
            console.log("b")
        },3000)
        resolve(1);
    })
    p.then(data=>{
        console.log(data);
    })
    console.log("c");// a 1 c b
```

状态管理

```javascript
        const pro1 = new Promise((resolve)=>{
            resolve(1)
            })
        const pro2 = pro1.then(data=>data*2)
        console.log(pro2) //pro2 的状态是pedding

始终记住，then是异步的代码，要等同步代码结束之后才执行，
console.log是同步代码，此时then还没有执行，所以pro2的状态是pedding 
```

**Promise的串联**

Promise对象中，用then还是catch方法会返回一个全新的Promise对象，并且具有以下特点：

1、如果当前Promise对象的状态未决，返回的是挂起状态

2、如果当前的Promise的状态是已决的，会运行相应的后续处理函数；并将后续处理函数的处理结果作为resolve的状态数据；（也就是说要把后续处理的数据return出去）

跟jq里面的then（）有点类似；

**Promise的API**

实例方法：then（）      catch（）      

finally（）------表示只要是已决状态就会执行，不管是resolve还是reject；

不可以传数据；

构造函数方法：

1、resolve      Promise.resolve（）      返回一个resolved的Promise 传递的参数就是状态数据

如果传入的是一个Promise对象，就直接返回

2、reject         Promise.reject（）

3、all              Promise。all（proms）  表示proms数组里面的Promise全部变成resolved状态之后才	

会变成resolve状态，并且返回每一个promise的状态数据

```javascript
let getRandom = function(min,max){
            return Math.floor(Math.random() *(max-min) + min) 
        }
        let proms = []
        for (let i = 0; i < 10; i++) {
            proms.push(new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    //经过随机的时间让他变成resolve状态
                    resolve(i)
                },getRandom(1000,5000))
            }))  
        }
        //当所有的promise都变成resolve状态时，执行后续的队列then
        const pro = Promise.all(proms)
        pro.then(()=>{
            console.log("全部完成")
        })
```



4、race           Promise.race（）     

表示任意有一个成功或失败，就会立即执行绑定的then等方法，         			    

参数就是成功或失败返回的参数，整体返回该Promise对象

关键字：async    await

能够简介化promise的语法；

async用于修饰函数（无论函数是字面量还是函数表达式），放置在函数最开始的位置，被修饰的函数返回的一定是Promise对象；

可以这么理解，async就是开启了一个Promise对象，里面的代码是同步的；但是遇到await就会阻塞，await后面的代码是异步的；await用来接收一个Promise对象（如果不是的话会直接调用Promise.resolve()）传递过来的参数；

要等到await后面的promise对象有结果之后才会执行下一步的代码；

```javascript
 //async
    async function test() {
        console.log(1);
        return 2;
    }
    //等价于
    function test1(){
        return Promise((resolve,reject)=>{
            console.log(1);
            resolve(2);
        }) 
    }
    const pro1 = test();
    console.log(pro);


    //await------一定是出现在async中
    async function test2(){
        const result = await test1();
        //相当于把test1返回的值赋值给result
        //等价于
        test1().then(data=>{
            const result = data;
        })
    }
```



**fetch**

fetch是h5新增的web api，改造了一下ajax 方便使用Promise（因为ajax是典型的异步请求）

```javascript
const config = {
        method:"POST",//默认是GET
        headers:"",//请求头
        body:"",//请求体
        mode:"",//请求模式------是否跨域等
        credentials:"",//是否发送cookies
        cache:"",//配置缓存信息
    }
    fetch(url,config);//请求就发出了
    //url是地址，config是配置，如果没有传config就按照默认的
    

    //返回值
    //fetch函数返回一个Promise对象
    //收到服务器的相应（不管是正确的相应还是错误的），返回的Promise对象是resolved状态，状态数据为Response对象；
    //网络连接错误，返回的Promise进入rejected状态，状态数据为错误信息

    //Response对象
    `-ok : 当消息相应码在200~299之间为true，否则为false
    -status：响应的状态码；
    -text：从相应中获取文本流；然后返回一个被解决为String对象的Promise------简单理解为把返回的数据转变为text文本
    -json： 把返回的数据转变为json格式；`
    
    //其实fetch(url,config)------new Response(url,config)创建一个新的对象也可以发送请求
```

文件上传

js是无法获取电脑内部的文件数据，但是通过input（type为file）提交的文件数据是可以得到的

formaData 是用来上传文件的API

#### **9、迭代**

迭代：从一个数据集合中按照一定的顺序不断取出数据的过程

与循环的区别：主要是有时候数据是未知的；

迭代器：对迭代的封装，在不同语言中有不同的表现形式；通常为对象；

迭代规范：1、得到下一个数据的能力；2、判断是否还有下一个数据的能力；

```javascript
//js迭代器格式 有一个next方法，返回一个对象{value："",done:""}
    // const obj = {
    //     next:function(){
    //         return {
    //             value:"1",//得到下一个数据
    //             done:"2"//判断是否迭代完成
    //         }
    //     }
    // }
    const arr1 = [1,2,3,4,5,6];
    function createrIterator(arr){
        let i = 0;
        return {
            next:function(){
                let result = {
                    value:arr[i],
                    done:i>=arr.length
                }
                i++;
                return result;
            }
        }
    }
    const result1 = createrIterator(arr1);
    let res = result1.next();
    while(!res.done){
        let item = res.value;
        console.log(item);
        res = result1.next()
    }
    // while(!result1.done){
    //     result1.next();

    // }
    //可迭代对象：
    //一个对象有知名符号 [symbol.iterator]并且属性值是一个迭代器创建函数，那么该对象就是可迭代的
    //数组和类数组就是可迭代对象，数组的隐式原型中有[symbol.iterator]属性
    
     //可迭代协议
    const arr = [1,2,3,4,5,6]
    //注意，是一直调用的iterator的next方法进行迭代，并不是返回对象的next方法
    const iterator = arr[Symbol.iterator]();
    //iterator就是一个迭代器  arr[Symbol.iterator]返回的是一个迭代器生成函数
    let result = iterator.next();
    while(!result.done){
        let item = result.value;
        console.log(item);
        result = iterator.next();
    }
    
    //for of 循环------可迭代对象都可以用这个循环
    for(const items of arr1){
        console.log(items)
    }
    //这个跟上面的while是一致的
    
    //迭代产生斐波那契数列；
    function creat(){
        let prev1 = 1,
            prev2 = 1,
            n = 0;
        return {
            next(){
                let value = null;
                if(n<2){
                    value = 1;
                }else{
                    value = prev1 + prev2
                }
                const result = {
                    value,
                    done:false
                }
                prev2 = prev1;
                prev1 = result.value;
                n++;
                return result;
            }
        }
    }
    const creator = creat();
    </script>
```

**生成器**

生成器是通过一个构造函数Generator创建的对象，即时一个迭代器，又是一个可迭代对象

在函数名前加*就可以生成一个生成器函数

生成器函数返回一个生成器，是一个迭代对象；yield 表示产生迭代的数据

```javascript
生成器函数返回一个生成器，是一个迭代对象；yield 表示产生迭代的数据
function *test1(){
        console.log("第一次执行");
        yield 1;
        console.log("第二次执行")
        yield 2;
    }
    function *test2(){
        let info = yield 1;
        info = yield info + 2;
        console.log("结束")
    }
    function *test3(){
        yield *test1();
        yield 1;
        console.log("结束")
    }
    const generator1 = test1();
    const generator2 = test2();//执行next第一次是yielf的1，第二次可以传递参数，就会赋值给info
    const generator3 = test3();
```

注意细节：

1、生成器函数可以由返回值，返回值出现在第一次done为true时的value属性中；

2、调用next方法时可以传参，传递的参数会交给yield的表达式的返回值

3、第一次调用next方法时传参是没有意义的；

4、在生成器函数内部可以调用其他生成器函数，但是要加上*

return 方法，调用该方法可以提前结束生成器

throw方法，调用该方法可以在生成器中生成一个错误

#### **10、集合**

1、set 用于存放不重复数据的集合

创建set集合      new Set（）；

传参      new Set（iterator） 任何可迭代的对象

使用Object.is的方式判断两个数据是否相等；正零和负零是一致的

set.add();      添加一个数据到set集合末尾，若有重复项会自动删除；

set.has();       判断是否有对应的数据

set,delete();    删除对应的数据；------返回是否删除成功

set.clear()      清空set集合

set转化成数组------可以用展开运算符

```javascript
//用set进行数组和字符串去重
        const arr = [1,2,4,,12,123,123,11,3,4,5,0];
        const s = new Set(arr);
        const result = [...s];
        const str = "asdhgaiosbdfgadfbihn";
        const sr = new Set(str);
        const result1 = [...sr].join("");
        //数组求交集和并集
        const arr1 = [22,55,1,3,2,6,85];
        const arr2 = [11,45,2,6,33,6,32,89]
        console.log( [...new Set([...arr1,...arr2])]);
        //交集------用数组的filter方法；
        console.log([...new Set(arr1)].filter(item => new Set(arr2).has(item)));
```

2、map集合：用于存储多个键值对数据------键名是不可重复的

创建map------ new Map()

new Map（iterable）------参数必须是长度为2的数组，表示键名和键值

方法：

size------获取键值对的数量

set------添加键值对（如果键名重复，就覆盖之前的值；如果没有就添加；）

get------根据键名获取键值

has------判断键名是否存在

delete------删除指定的键

clear------清空

转换成数组------用展开运算符

weakSet------不是可迭代的对象

基本上跟set一样的，有几个区别：

1、内部存储的对象地址不会影响垃圾回收------如果是set的话，设置obj=null之后不会删除，但是在weakSet里面就会；

2、不是可迭代的对象，不能遍历，没有size和forEach方法；

```javascript
let obj = {
            a:1,
            b:2
        };
        const s1 = new WeakSet();
        s1.add(obj);
        obj = null;
        console.log(s1);//写set不会清除 
```

**11、属性描述符**

```javascript
 const obj = {
            a: 1,
            b: 2,
        }
        //得到属性a的描述符
        Object.getOwnPropertyDescriptor(obj, "a");
        //修改描述符
        Object.defineProperty(obj, "a", {
            value: 2,
            configurable: true,
            enumerable: true,
            writable: true,
        })

        //存取器属性------可有控制属性的赋值和获取
        //在描述符里面有get和set方法
        const obj1 = {
            b: 1
        }
        Object.defineProperty(obj1, "a", {
            get() {
                console.log("调用了get")
            },
            set() {
                console.log("调用了set")
            }
        })
        //内存器属性，存的变量并不会存在内存里面；读取的时候会调用get方法，设置属性的时候会调用set方法
        console.log(obj1);
        obj1.a = 2;
        console.log(obj1.a);

        //可以自定义条件控制属性的存取
        const nameObj = document.getElementById("name");
        const ageObj = document.getElementById("age");
        const user = {};
        Object.defineProperties(user,{
            age:{
                get(){
                    return ageObj.innerText;
                },
                set(val){
                    if(typeof(val) !== "number"){
                        throw ("请输入数字")
                    }
                    ageObj.innerText = val;
                }
            },
            name:{
                get(){
                    return nameObj.innerText;
                },
                set(val){
                    nameObj.innerText = val;
                }
            }
        })
```

**12、代理和反射**

**13、数组的增强方法**

1、find（）找到指定的数据

2、findIndex（）找指定的数据的下标

3、fill（） 按照指定的数据填充满数组

4、includes（） 判断指定的数据是否存在

5、Array.of（）创建数组
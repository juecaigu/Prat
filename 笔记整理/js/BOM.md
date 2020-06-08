### BOM

浏览器对象模型；是与浏览器窗口进行交互的对象，核心是`window`对象

#### `window` 

浏览器的顶级对象；有一系列的方法和属性；

全局的变量和方法会挂载到`window`对象上，局部作用域内，未声明直接赋值的变量会默认挂到`window`上；

##### 常用的方法

1、`window.onload()`  等页面的所有资源都加载完毕（包括图片，外部文件等所有资源），执行里面的代码； 

> 注意: 使用该方法之后就不用考虑`js`文件的位置；但是这个方法要加载完所有的资源，性能比较差；
>
> 有一个相似的方法： `document.addEventListener("DOMContentLoaded",function(){})` -- 表示当`DOM`元素加载完毕就可以执行里面的代码，性能较好；

2、`window.onresize()` --  当窗口尺寸发生变化就会触发该方法；

3、`window.setTimeout(func,duration)`  延迟计时器；返回一个数值，可以通过`clearTimeout(计时器名)`清除计时器；

4、`window.setInterval(func,duration)`  计时器，隔一段时间反复调用函数；同样的可以用`clearInterval()`来清除定时器；

> 两者都是`window`上是方法，所以函数里面的`this`指向的是`window`

#### JS的执行机制

js是单线程的，任务可以分为同步和异步任务；一般来说异步任务比较耗时间，所以js开辟了一个异步处理程序，和一个任务队列；

1、所有的同步任务会放到主线程上按照顺序执行，形成执行栈；

2、遇到异步任务会放到异步处理程序，如果异步任务触发，就添加到任务队列里面；

3、当执行栈为空，就会按照顺序去执行任务队列里面的任务； 

> 异步任务有宏队列和微队列的区别,微队列会在宏队列之前被添加到执行栈中；
>
> 常见的宏任务：事件回调，`ajax回调` , 定时器
>
> 常见的微任务：`promise`  ，  `mutation`

4、重复上述的1-3步骤，直到所有的任务都执行完毕

**以上就是事件循环机制**

#### `location`对象

包含当前`URL`的信息；

几个常用的属性和方法：

* `location.href`  返回整个url
* `location.search` 返回url上的参数
* `location.host`  返回主机（域名）
* `location.port` 返回端口号
* `location.pathname`返回路径
* `location.hash` 返回片段 

* `location.assign()`  -- 跳转到某个页面 （会有记录，可以回退）
* `location.replace()` -- 替换地址，跳转页面（不可以回退）
* `location.reload()` -- 相当于刷新；里面可以传参，默认是会先读取缓存端的数据，如果有变化的话再去服务端请求；如果参数为`true`就会强制去服务器请求；

#### `navigator`对象

包含了浏览器的相关信息；

常用的几个方法和属性:

* `navigator.userAgent` 获取浏览器的信息--包括浏览器种类，版本等；

#### `history 对象`

记录浏览器的访问历史

常用的几个方法和属性:

* `history.forward()` 前进一个页面
* `history.back()` 后退一个页面
* `history.go()` 里面可以传参，表示跳转几个页面；前进一步传入1 ; 后退一步传入-1;

### 本地存储

*  `sessionStorage`

生命周期为关闭浏览器窗口；多页面之间可以共享；以键值对的形式存储；

常用的方法:

> `sessionStorage.setItem('key','value')` -- 设置
>
> `sessionStorage.getItem("key")` -- 获取数据
> `sessionStorage.removeItem("key")` -- 移除数据
>
> `sessionStorage.clear()`  --  清空数据（所有）

* `localStorage`

存储在硬件里面，所以关闭浏览器不会失效；多页面之间可以共享；以键值对的形式存储；

常用的方法跟`sessionStorage`类似；

* `cookie` 

一般由服务器生成，可以设置生命周期；存储大小在4K左右；每次`http`请求都会跟随请求头发送；

> 应用场景： 
>
> **cookie**  :  一般用于保存用户的登录信息，如果用户是登录过的，服务器会往`cookie`中加入一段唯一的验证信息，下次登陆的时候只要读取到这个信息就可以判断是否登录；
>
> **localStorage**  :  一般用于存储本地数据，比如网站的购物车；或者是游戏的本地数据；但是一些重要的敏感信息最好不要用；因为在网页的控制台能够更改这些值；
>
> **sessionStorage**  :  一般用于多页面的数据存储，比如一些内容特别多的表单，就可以分解成很多子页面；这个时候单页面的存储可以用`sessionStorage`
### DOM

#### 1、DOM简介

文档对象模型；

结合浏览器渲染模式，会把`html`文档生成一个`dom`对象，对象上的节点会对应上`html`文档的内容，所以可以通过操作对象来操作文档上的内容；

#### 2、获取元素

> * getElementById()  根据id选择元素
> * getElementsByTagName()  根据标签名选择元素，获取的是一个伪数组
> * getElementsByClassName()  根据类名选择元素，获取的是一个伪数组
> * querySelector()  根据css选择器的方式选择元素，获取的是第一个；注意是静态的，也就是页面元素改变的时候不会自动改变
> * querySelectorAll()  根据css选择器的方式选择元素，获取的是所有，一个伪数组；同样是静态的；
>
> 特殊的元素 
>
> * `body` -- document.body
> * `html` -- document.documentElement

#### 3、操作元素

1、修改元素的内容

> `innerHTML` -- 可以获取和修改元素的内容；会对标签的格式生效
>
> `innerText` -- 可以获取和修改元素的内容；只对文本生效，遇到换行或者空格会忽略

2、修改标签上的属性

> var img = document.querySelector("img")
>
> img.src = "img/xxx.jpg"  
>
> 可以直接修改和获取标签上的自带属性
>
> 如果想要自定义属性，可以使用
>
> `setAttribute`设置自定义的属性
>
> `getAttribute` 获取自定义的属性
>
> `removeAttribute` 移除自定义的属性

* `h5`之后的自定义属性有一个规范，`data-属性名`表示自定义属性；`data-`开头;
* `h5`获取自定义属性的新增方法；`element.dataset["属性名"]` ；注意会有兼容问题；

3、修改样式

> `element.style.属性 = “” `  改的是行内样式
>
> `element.className =""` 可以添加类名，但是会覆盖掉原来的类名
>
> `element.classList.add()` 可以添加css类名的列表，不会覆盖；
>
> `element.classList.remove()`删除`css`类名的列表 
>
> `element.classList.toggle()` 有类名就删除，没有类名就添加

4、添加和删除元素

* 创建和添加

> document.creatElement("标签名")  就可以创建一个新的元素；
>
> 通过`appendChild()` 或者是 `insertBefore()`添加到页面上；

* 创建的其他两种方法

  1. `document.innerHTMl`   -- 如果要创建多个元素，会使用到字符串拼接，性能比较差；所以可以用数组的形式拼接；

     单个创建的话效率会比`document.createElement()`高

  2. `document.write()` -- 会重写文档（不推荐）

* 删除

> `parent.removeChildren()` 可以删除对应的元素

5、克隆标签

> `ele.cloneNode()` 克隆一个标签；如果参数不为`true`就是浅克隆，只复制标签；如果为true就是深度克隆，会复制整个标签；

#### 4、节点操作

一般节点有几个属性： 

* 节点名称"nodeName"

* 节点类型`nodeType`

* 节点值`nodeValue`

nodetype可以返回节点的类型；

> 元素节点返回1   --   操作最多的
>
> 属性节点返回2
>
> 文本节点返回3
>
> 注释节点返回8
>
> document返回9

常用的方法：

> children()  获取子元素节点，返回一个伪数组
>
> nextSilbing（） 返回下一个兄弟节点
>
> nextElementSibling() 返回下一个兄弟元素
>
> previousElementSibling()返回上一个兄弟元素节点



### 事件

事件有三个要素：1.事件源，2.事件处理程序，3.事件类型

1、事件绑定和移除

绑定

> * `ele.onclick = function (){} `   --  只能绑定一个事件，多次绑定后者会覆盖前面的；删除事件的话 让它的处理程序等于`null`
>
> * `ele.addEventListener("click",function(){},false)` -- 可以绑定多个事件，并且会按照绑定顺序执行；

移除

`ele.removeEventListener("事件名","对应的函数名")`



2、事件流

分为三个阶段： **捕获 --  目标阶段  --  冒泡阶段**

捕获是从外往里，冒泡是从里往外；



3、事件对象

绑定事件的时候，处理程序函数可以有一个事件对象的参数；`ele.onclick = function(e){}`  --  `e`就是事件对象里面有很多事件的属性( 有兼容性问题，ie当中需要用`window.event`获取)；常见的包括：

1. `e.target` 返回事件的触发源 -- 可以做事件委托；

2. `e.type`返回事件的类型

3. `e.preventDefault()`阻止默认事件；低版本使用`e.returnValue` 

   > 如果用的传统的绑定方式，可以用`return false`来进行阻止默认事件;

4. `e.stopPropagation()`阻止事件冒泡 -- 低版本使用`e.cancelBubble = true`

5. `e.clientX  e.clientY`  鼠标点击相当于可视区域的坐标(滚动条无影响)

6. `e.pageX  e.pageY` 鼠标点击相当于文档的坐标（滚动条有影响）

7. `e.keyCode` 返回按键的`ASCII`码 ；`keydown`不区分大小写(`a` 和 `A` 返回的是一样的)，`keypress`会区分大小写

4、事件委托

在父级节点上设置监听器，利用的是事件冒泡，每个子元素事件会冒泡到父元素上，用`e.target`获取事件源；

```javascript
例子：
<ul>
	<li>1</li> 
	<li>2</li>   
	<li>3</li>   
	<li>4</li>   
	<li>5</li>   
	<li>6</li>   
</ul>
//是绑定在父元素上的
oUl.onclick = function (e) {
    console.log(e.target.innerText);
}
```



5、常用的鼠标和键盘事件

1. `contextmenu` 鼠标右键事件
2. `selectstart` 选中文字
3. `mouseenter  mouseover`鼠标进入  前者是不会冒泡的
4. `mouseleave mouseout`鼠标离开  前者是不会冒泡的
5. `keydown keypress` 键盘按下   `press`不能识别功能键，但是会区分大小写 -- 先会执行`keydown`
6. `keyup`键盘弹起
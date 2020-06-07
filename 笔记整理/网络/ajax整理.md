ajax整理

#### `ajax`简介

`ajax`是一种技术，是浏览器使用`javascript`来向外部请求数据；实现不用刷新整个页面就可以获取到外部的数据，在对应的地方显示；

原理就是使用了`XMLHttpResquest`对象；（`ie`用的是`ActiveXObject`对象）

1、创建`XMLHTTPRequest`对象

2、打开一个路径，并发送请求；

3、注册一个监听事件`onReadyStateChange`，判断请求是否完成（状态码`readyState === 4`），判断请求是否成功（`request.status === 200`  表示接受成功）

5、`request.responseText`接受返回的数据；

完整的封装代码：

```javascript
function myAjax(url){
    let request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    request.onreadyStateChange = function(){
        if(request.readyState === 4){
            if(request.status === 200){
                return request.responseText;
            }else {
                return null;
            }
        }
    }
    request.open("GET",url);
    request.send();
}
```

#### 请求方法区别：

`get`和`post`区别:

本质上没有区别，底层原理都是`TCP`协议；

* `get`传输数据是通过拼接在URL上，？分隔地址和数据，多个数据用&拼接；`post`请求数据放在请求体中； 一般来说浏览器和服务器对URL长度会有限制，但是理论上`post`数据长度是没有限制的；
* `get`是可以被缓存的，`post`不可以；所以刷新页面或者回退的时候，`get`会直接从缓存中找数据，`post`会重新发送一次请求；
* `get`请求的数据只能接受`ASICII`码；
* `get`请求只发送一次数据包，`post`发送两次数据包；

#### 跨域问题：

`ajax`只能请求同域下面的数据，对于跨域的数据请求不到；

> * 协议 比如 http 和 https就是不同的协议
> * 域名   www.baidu.com   和   www.sina.com 是不同的域名
> * 端口号  本地服务器的端口号是locolhost:8080

以上三个任意一个不同就会产生跨域问题;

解决跨域的方法有以下几种：

1. `jsonp`，利用浏览器允许跨域请求`script`资源文件；

   一般是返回回调函数的形式；比如：

   `refreshPrice({"0000001":{"code": "0000001", ... });`

   所以需要先准备一个函数，等`jsonp`返回数据的时候就执行这个函数把里面的内容取出来；事先要跟后端约定好回调参数名字以及返回参数的格式；

   然后动态添加到页面上:

   ```javascript
   function myJsonp(url){
       const s = document.createElement("script");
       s.setAttribute("src",url);
       const headr = document.getElementsByTagName("header")[0];
       headr.appendChild(s);
   }
   ```

   - `jsonp`只能用`GET`请求；

2. `CROS`是`H5`规定的规范跨域请求的方式；

   原理就是浏览器检查响应头里面有没有设置`Access-Control-Allow-Origin`并且包含本域；如果有的话就跨域成功；

   ![image-20200517080735861](C:\Users\江杰\AppData\Roaming\Typora\typora-user-images\image-20200517080735861.png)

   本域是`my.com`  请求数据的地址是`sina.com`；可以看到响应信息中有`Access-Control-Allow-Origin`并且包含了本域，所以请求成功；

   这样看来，跨域是否成功取决于服务端是否返回正确的`Access-Control-Allow-Origin`
#### `localStorage`的使用方法：

```javascript
// localStorage的用法
var local = window.localStorage;
//写入
local["a"] = "data1";
local.b = "data2";
local.setItem("c","data3");
//读取
const local1 = local["a"];
const local2 = local.b;
const local3 = local.getItem("c");
//修改
local.b = "dataChange"
//删除
// local.clear();  //清除所有
local.removeItem("a") //删除单个

console.log(local1,local2,local3);
```

在浏览器的控制台，`Application`中可以查看；是存储在硬件上的，所以可以永久存储；

`sessionStorage`是会话存储，所以生命周期就是浏览器窗口的时长，关闭或者刷新之后就会清空；
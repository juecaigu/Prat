## `async await`

有这样一个例子

```javascript
var a = 0;
async function test(){
    let result = await a + 10;
    let result1 = await a + 10;
    console.log(result); // 10
    console.log(result1) // 11
}
test();
a++;

----------------------------------------------------------------------------
可以这么理解：
function test(){
    return new Promise(resolve => {
        resolve(a + 10)
    }).then(res => {
        let result = res
        console.log(result);
        return result;
    }).then(res=>{
        let result1 = res;
        console.log(result1)
    })
}
test();
a++
```

`await`等待的是后面表达式的结果，可以是一个`promise`对象也可以是表达式；但是注意 `await a + 10`跟`await (a + 10)`是不同的，后者才是一个表达式，前者是等待的`a`




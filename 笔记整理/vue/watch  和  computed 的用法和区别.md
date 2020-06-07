### watch  和  computed 的用法和区别

#### **watch**

`watch` 用来监听`data`当中值的变化；最基础的用法：

```javascript
watch:{
    data(){
        console.log("data改变了")
    }
}
```

但是要注意的是这样写只能监听`data`里面的基本类型的值，引用类型的值是监听不到；而且在初始赋值的时候不会监听；

所以作如下改进:

```javaScript
watch:{
    data:{
        handle(){
            console.log("事件处理")
        },
        immedite:true,//第一次赋值就会监听
        deep:true,//深度监听，意味着引用类型的值也会被监听到
    }
}
```

#### **computed**

计算属性：跟方法类似，但是只有在其中的值发生改变的时候才会执行；

跟`watch`的区别在于
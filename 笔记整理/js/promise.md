## Promise 

#### 概念介绍:

`promise`是一种异步解决的方案，之前异步通过回调的方式，很容易形成回调地狱的问题，造成代码很难维护；`promise`改变了异步任务的处理方式；

有三种状态：`PENDING FULFILLED REJECTED`   未决 - 已决 （成功或失败）

状态只能从未决阶段推向已决阶段；当状态已决是不可以改变的；

状态到达已决之后，会处理后续的函数，常用的方法是`then`和`catch`  -- `then`可以链式调用

构造函数里面的任务是同步的，异步任务会放到事件队列里面，等状态已决之后，依次执行；

#### 使用方法:

```javascript
接收两个函数参数，表示在什么时候把状态推向已决，且决定是成功还是失败；
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





#### 模拟代码

```javascript
   //存储三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class MyPromise{
    constructor(handle){
        if(!(typeof handle === "function")){
           throw new Error("must be a function")
        }
        this._status = PENDING;
        this._value = null;
        //增加成功和失败函数的队列
        this.fulfilledQueue = [];
        this.rejectedQueue = [];
        handle(this._resolve.bind(this),this._reject.bind(this));
    }
    //定义成功和失败函数  -- 改变状态和值
    // 最开始未加事件队列处理的时候
    // _resolve(val){
    //     if(this._status !== PENDING)return ;
    //     this._status = FULFILLED;
    //     this._value = val;
    // };
    // _reject(err){
    //     if(this._status !== PENDING)return ;
    //     this._status = REJECTED;
    //     this._value = err;
    // };

    //添加事件队列方法
    _resolve(val){
        const run = ()=>{
            if(this._status !== PENDING) return ;
            //依次执行成功队列里面的函数
            const runFullfilled = (value)=>{
                let callback;
                //循环，去执行里面的函数；shift方法会清空队列
                while(callback = this.fulfilledQueue.shift()){
                    callback(value);
                }
            }
            //依次执行失败队列里面的函数
            const runRejected = (value)=>{
                let callback;
                while(callback = this.rejectedQueue.shift()){
                    callback(value);
                }
            }

            //如果val是promise对象，必须是等val的状态改变之后，才会改变resolve里面的promise状态
            if(val instanceof MyPromise){
                val.then(value=>{
                    this._value = value;
                    this._status = FULFILLED;
                    runFullfilled(value);
                },err=>{
                    this._value = err;
                    this._status = REJECTED;
                    runRejected(err);
                })
            }else{
                this._value = val;
                this._status = FULFILLED;
                runFullfilled(val);
            }
        }
        //为了能够支持同步的promise，这里采用异步的调用：
        setTimeout(run,0);
    }
    
    _reject(err){
        if(this._status !== PENDING) return ;
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            let callback;
            while(callback = this.rejectedQueue.shift()){
                callback(err);
            }
        }
        setTimeout(run,0);
    }


    then(onFullfilled,onRejected){
        const {_status,_value} = this;
        return new MyPromise((onFullfilledNext,onRejectedNext)=>{
            //封装一个成功的回调函数
            let fullfilled = (value) =>{
                if(!(typeof onFullfilled === "function")){
                    onFullfilledNext(value);
                }else{
                    let res = onFullfilled(value);
                    if(res instanceof MyPromise){
                        //如果返回的是一个promise对象，必须等状态做出改变再执行
                        res.then(onFullfilledNext,onRejectedNext)
                    }else{
                        //如果返回的是普通的值，就直接执行then里面的成功方法
                        onFullfilledNext(value)
                    }
                }
            }
            //封装错误的回调函数
            let rejected = (err)=>{
                if(!(typeof onRejected === "function")){
                    onRejectedNext(err);
                }else{
                    let res = onRejected(err)
                    if(res instanceof MyPromise){
                        res.then(onFullfilledNext,onRejectedNext)
                    }else{
                        //这里是成功的方法，因为此时promise的状态还没有确定；
                        onFullfilledNext(err);
                    }
                }
            }

            //处理回调的队列
            switch(_status){
                case PENDING : 
                //如果是未决状态，就把成功和失败的回调加到事件队列里面；
                this.fulfilledQueue.push(fullfilled);
                this.rejectedQueue.push(rejected);
                //然后再去_resolve方法里面改变，让每次改变状态就会依次执行队列里面的函数
                break;
                case FULFILLED :
                    fullfilled(_value);
                    break;
                case REJECTED :
                    rejected(_value);
            }
        })
    }
}

var pro = new MyPromise((resolve,reject)=>{
    resolve()
})
pro.then((res)=>{
    console.log(res);
},()=>{})
```


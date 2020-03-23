(function(global,factory){
   //在global环境中执行factory 
    factory(global)
})(window,function( window ){
    var jQuery = function(selector){
        //返回的是一个init方法创建的对象，是用jQ分装过的，方便调用其他方法
        return new jQuery.fn.init(selector);
    }  
    //定义prototype上的方法
    jQuery.fn = jQuery.prototype = 
    {
        constructor:jQuery,
        //先固定jQuery.fn.init的length属性
        length:0,
        css : function(config){
            //config是对象的形式
            for(var i = 0;i<this.length;i++){
                for(var attr in config){    
                    this[i].style[attr] = config[attr];
                }
            }
            //可以在调用css方法后继续链式调用
            return this;
        },
        
        get : function(num){
            if(num == null){
                //类数组转换成数组
                return [].slice.call(this);
            }else{
                return num < 0 ? this[this.length + num] : this[num];
            }
        },
        //推入栈
        pushStack : function(eles){
            //合并函数
            var merge = function(prev,curr){
                var len = +curr.length;
                var i = 0;
                var j = prev.length;
                for(;i<len;i++){
                    prev[j++] = curr[i];
                }
                prev.length = j;
                return prev;
            }
            // this.constructor 表示的是jQuery.fn.init
            var ret = merge(this.constructor(),eles);
            //能够方便的调用prevObject属性返回之前的对象；
            ret.prevObject = this;
            return ret;
        },

        eq : function(i){
            var len = this.length,
            j = +i + (i < 0 ? len : 0);
            return this.pushStack(j>=0 && j<len ? [this[j]]: []);
            //推入栈后还是返回的jQ对象
        },

        end : function(){
            return this.prevObject || this.constructor();
        },

        each :function(callback){
            var obj = this;
            //类数组
            if(isArrayLike(obj)){
                for(var i = 0;i<obj.length;i++){
                    //传入索引和每一项，作为回调的参数
                    //如果each里面有return false 就会停止循环
                    if(callback.call(obj[i],i,obj[i]) === false){
                        break;
                    };
                }
            }else {
                //对象,没有length属性
                for(var attr in obj){
                    if(callback.call(obj[attr],attr,obj[attr]) === false){
                        break;
                    }
                }
            } 
        }
        
    } 
     //初始化的方法
     //放在定义方法之后是因为想把方法放到一个对象里面，写成jQuery.prototype = {} 会改变原型
     //所以init方法需要单独拿出来添加上；
    var init = jQuery.fn.init = function(selector){
        if(selector == null || selector == undefined){
            return this;
        }
        //模拟实现根据id和class名称选择
        if(typeof selector == "string" && selector.indexOf(".") != -1){
            var dom = document.getElementsByClassName(selector.slice(1));
        }else if(typeof selector == "string" && selector.indexOf("#") != -1){
            var dom = document.getElementById(selector.slice(1));
        }
        //返回的是一个类数组,有length属性
        this.length = 0;
        //可以分装一份原生对象, 
        //如果是原生对象的话，就不会进上面的if ，dom为undefined，使用 || 可以直接返回前面的值
        //避免报错
        if(selector instanceof Element || dom.length == undefined){
            this[0] = dom || selector;
            this.length ++;
        }else {
            for(var i = 0;i<dom.length;i++){
                this[i] = dom[i];
                this.length ++;
            }
        }
    }
    //之后jQ的方法会定义在prototype上，让init返回的对象的原型等于jQuery.prototype,这一步很精髓
    jQuery.prototype.init.prototype = jQuery.prototype;
    
    //extend 添加方法，或者是克隆（true即为深层克隆）
    jQuery.extend = jQuery.fn.extend = function(){
        //1、添加方法  2、浅克隆 3、深度克隆
        var target = arguments[0] || {},
            deep = false,
            opations,
            name,
            copy,
            isArr,
            src,
            clone,
            length = arguments.length,
            i = 1; //这里定义i=1是因为后面arguments取第二位的时候要用，且判断target的时候也可用
        //先对传入的参数做一个判断
        if(typeof target === "boolean"){
            deep = target;
            //如果是深拷贝  target改为第二个参数
            target = arguments[i] || {};
            //后面遍历的时候就从第二个开始
            i++;
        }
        //如果target是字符串或者数字等类型的，就为空对象
        if(typeof target !== "object" && typeof target !== "function"){
            target = {};
        }
        //如果传入的是一个函数
        if(target.length === i){
            target = this;
            //后面遍历的时候就从0开始;
            i--;
        }
        //定义一个for循环，能够处理上面的三种情况
        //遍历每一个参数
        for(;i<length;i++){
            //这里用的是 != 就连undefined一起过滤了；
            if((opations = arguments[i] != null)){
                //遍历每一个对象
                for(name in opations){
                    copy = opations[name];
                    
                    //清除无限循环--
                    //比如 a = {}  b = {son:a}  a.son = b => a里面的son就会一直循环
                    if(target === copy){
                        continue;
                    }
                    //如果是深拷贝，且是数组或者是对象
                    if( deep && copy && ((isArr = Array.isArray(copy)) || typeof copy === "object")){
                         /* 
                        target = {
                            a:"abc",
                            b:{
                                age:1
                            },
                            c:[1,2,3]
                        }
                        obj2 = {
                            d:"eee",
                            b:{
                                age:2,
                                sex:male
                            }
                            d:[2,3,4]
                        }
                        
                        */
                        src = target[name];
                        if(!isArr && Object.prototype.toString(src) != "[object Object]"){
                            clone = {}
                        }else if(isArr && !Array.isArray(src)){
                            clone = []
                        }else{
                            //相当于target中有copy相同的name，且同为对象或者数组，可以直接拿来用
                            clone = src;
                        }
                        //结束一次循环就要让下一次循环判断copy是否为真
                        isArr = false;
                        //递归,把copy里面的内容添加到clone中
                        target[name] = jQuery.extend(deep,clone,copy)
                    }else if(copy){
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }

    //判断是不是类数组或者是数组,对象且有length属性
    //jQ源码里面对这块判断比较复杂
    var isArrayLike = function (obj){
        return typeof obj === "object" && obj.length
    };

    //把jQ 挂载到window
    window.$ = window.jQuery = jQuery;
})
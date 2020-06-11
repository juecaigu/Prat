### jQuery

精髓 ：  获取元素  链式操作 循环

1、先用$（）获取对象，一切的方法都是要在jQ对象上调用的，$可以通过标签的形式创建新的元素

$(<div></div><p></p>)可以创建div和p标签

2、获取的方法

1、可以根据css选择器的方式来选择 比如 $(div span)可以选择div下面的span标签

2、在后面写个冒号可以选择特定的某一个比如$(div span:first) 可以选择第一个span

$(div span:eq(2))选择div 下的第二个span

3、选择器选择到空值的时候不会报错（有一个容错机制）

4、用原生Js获取的对象需要先封装成jQery对象才能调用人家的方法

5、$(function(){})相当于Js的时间线，在Dom加载完毕之后执行，注意与window.onload区别（后者是全部加载完成之后，前者是Dom加载完毕之后执行，在window.load之前）

相当于$(document).onready(function(){console.log("111222")})

3、常用的方法

1、get（） 获取指定的元素，返回的是原生的对象 传入索引 传入空值的时候返回全部

2、eq（）获取指定的元素，返回的是jQuery对象 

3、find（）在后面找指定的对象$(div).find("span")表示在div后面找span标签

4、filter（）在获取的对象中筛选指定的值，可以是类似于class = “spn” 也可以是function

function（index，ele）规则跟数组的filter是一样的，返回的是原生值

5、not（）跟filter相反，筛选不符合规则的

6、is（）判断前后是否相等；

7、add()和end()方法；前者可以取并集选择，后者可以回退一个选择；

4、css属性，可以赋值和取值（传值是可以表达式比如width：+=100；），取值的时候取的是计算属性值

5、attr和prop可以取标签的内容；attr可以取属性和特性（是映射的）；prop取特性无法获取属性（特性是映射的）；要给标签添加自定义的属性用attr；如果想去获取checked等属性的时候用prop

（input标签只要有checked，不管里面传啥值都是默认选中的，且attr获取的都是checked）

6、html方法。可以取值也可以赋值，取值的时候如果是一组对象，只取第一个的值；赋值的时候是会给每一组都赋值；比较特殊，需要注意；

7、addClass（）和removeClass（）方法可以增加或者是删除className ；removeClass（）里面不传参数默认删除所有的class；多个类名可以用空格分开，hasClass（）判断是否有选中的类名；

 //切换标签页     $(".demo").click(function(ele,index){       $(".demo").removeClass("active");       $(this).addClass("active");     })

8、val()可以获取标签的value值，但是跟html一样，一组的时候只能获取第一个；

用val（）改变input的value值时，会改变显示效果，但是行间还是显示原来的值；

//赋值的时候如果传函数的话，参数表示的是索引和之前的value值 $().val(function(index,oldValue){ })

9、next（）获取下一个兄弟元素节点------里面可以传参数增加限定条件，next（“p”）获取下一个兄弟元素节点并且名字是p的标签，不是的话就不选；prev（）是获取前一个

10、nextAll（）获取所有之后的兄弟元素节点；nextUntil（）表示往后选直到限定条件；nextUntil（“span”，“p”）表示选后面的所有p兄弟元素，直到遇见span结束；

11、siblings（）获取所有的兄弟节点；parent（）获取上一级节点（传参数可以进行过滤）；

parents（）可以获取多个父级元素；如果不传参数的话就是获取所有的；

closest（）找满足条件的最近的父级；是从自己开始找，如果参数是自己本身的话就是选择本身；

setoffparent（）获取最近的有定位的父级元素；

12、a。insertBefore（b）在b之前插入a；b。before（a），同样表示在b之前加入a；主要是链式调用的时候要操作的对象不一样；

13、append（）和preappend（）  前者是在后面添加，后者是在后面元素的最前面添加；注意里面写文本的话添加进去的还是文本；

14、remove（）删除，返回删除的元素------返回的是新的元素；

detach（）删除，返回删除的元素------返回的是原来的元素（保留事件）

15、wapper（）添加指定的父元素（需要用$包裹一下或者直接是标签的形式<div></div>）

wapperInner()给子集增加父级

wapperAll（）给所有添加指定的父级------最好在同级里面操作；

unwapper（）删除直接父级

16、clone（）克隆；可以克隆出一样的（包括属性和特性），如果要复制事件就往里面传true，传空的话是不会克隆事件的；

17、data（）与prop（）类似，可以往标签添加或者获取；但是添加的时候行内是不显示的，获取的时候传入的时候是数字类型就是数字，是布尔值就是布尔值，而attr和prop获取的时候都是返回的字符串；如果行内样式中有类似data-css 这样用 data（“css”）是可以获取到该值的；

attr  如果写在行间的时候比较多，且需要获取的时候还得用dom去获取；但是data是映射关系，在获取属性的时候不会操作dom  具体可以看jQ 15课时；

**事件**

1、.on()有四个参数；1、type 2、selector 3、data 4、handle

如果传入的是字符串的时候会默认为第二个参数，所以想要只传入第三个参数的时候可以空置第二个参数 .on(click,,ture,function(){})类似于这样，第二个参数会让绑定的事件源更加精准

$(ul)..on(“click”,“”li“,”function(e){

$(e.target).index()

})

2、one（）只执行一次的事件 最后用return false

3、off（）用于解绑事件，如何绑定最好如何解绑；

4、trigger（）自动触发事件=======》比较常用  ------可以自定义事件

$(".demo").on("click",function(e,a,b,c,d){       console.log("click",a,b,c,d)     }) //可以传入数组参数，在之前的事件里面可以传入参数         $(".demo").trigger("click",[10,20,30,40])

5、hover（function（）{}，function（）{}）表示移入移出事件

**动画**

1、show（） 和 hide（）表示显示和隐藏

show（1000，"swing"）可以传入显示的时间，以及显示的形式swing表示两端慢中间快

linear表示匀速变化

可以多维度的变化（宽度，透明度和高度都变化）

show和hide只是改变

toggle（）可以自动判断当前状态时show或者hide，可以在两者之间切换；show时变成hide  hide时变成show

fadetoggle（）淡入淡出效果，先display：block  再改变透明度

fadeTo（1500,0.6，“swing”，function（）{}）表示到透明度0.6停止；

sildeup  slidedown  slidetaggle  表示卷入卷出  只改变高度；

2、animate（target，duration（运动时间），easing（运动方式），callback）默认的运动时间是400ms

内置队列（把所有的运动都保存在队列中，依次执行）----------> 所以要执行多段运动的时候可以在后面添加或者用回调函数；

stop（）停止运动   1、不传参------>停止当前运动 （后续的运动还是会执行）  2、传一个ture 结束所有的运动；3、传入两个ture 表示结束当前运动并且到达当前运动的目标点

finsh（）结束所有运动并且到达最后的目标点

3、队列 queue（）传入两个参数，type和content     是以数组是形式保存的

$('.demo').queue("chain",function(next){

console.log(over1)

next相当于下一个队列的函数

next()---------->在之后出队列的时候可以依次出去，不加next每次只出一个

})

出队列 dequeue（），传入队列的名称

1、offset（）返回距离文档的位置；返回一个对象，有left和top属性；------>同样可以赋值

​     position（）返回距离，规则跟css的定位规则一致；

2、scrollTop（）和scrollLeft（）可以获取滚动距离；同时可以赋值

3、width（）表示内容宽度；innerWidth（）表示+padding；outerWidth（）表示内容+padding+border ；outerWidth（true）表示再加margin

4、each（）与数组的forEach（）类似

index（）获取索引

**工具方法**

1、$.type()判断数据类型------>可以返回具体的类型（比如传入数组可以返回Array(）返回的是字符串；

2、$.trim()去除空字符串；

3、$.proxy()改变this指向

// $.proxy()的应用     function show (){       console.log(this);     }     var obj = {       name:"111",       age:"22"     }     //要有一个变量接收返回的值     var showproxy = $.proxy(show,obj);     showproxy();

4、防止冲突； $.noConflict()  防止命名变量名冲突；------> var $c = $.noConflict()相当于把$c变成了$

5、$.praseJSON()把符合json形式的字符串转换成json，与原生的json.prase()一样；

6、$.makeArray()把类数组变成数组；可以传两个参数，把前面的数据拼接到后面的数据中；

7、$.extend()可以把自定义方法传入到工具方法里面；------>用json数据格式；

$.fn.extend（）可以把自定义方法传入到实例方法里面

//拓展方法； $.extend({       mandom:function(a,b){         var len = b - a;         return parseInt(Math.random() * len + a)       }     })     console.log($.mandom(10,20)) //浅层克隆 $.extend(obj1,obj2)------>把obj2克隆到obj1（覆盖）传入多个obj时会把后面的都覆盖掉obj1 //深层克隆 $.extend(true,obj1,obj2)也是把obj2覆盖掉obj1        

8、$.ajax()发送网络请求；

 $.ajax({       url:"",//请求地址       type:"GET",//获取方式       data:{},//获取的数据字段       success:function(){},//请求成功之后执行的函数；       error:function(){},//请求失败执行函数；       complete:function(){},//请求完成之后执行的函数;       context:"",//改变上下文;       async:true,//或者是false  用于确定异步或者同步效果；默认是异步执行的       dataType:"jsonp"//跨域     })

9、异步执行是离不开回调机制的

 //$.callBack()     var abc = $.Callbacks()//可以传参数 once表示只执行一次；memory表示执行之后再添加也会执行                 //stopOnfalse 表示在队列里面有false就停止     function a (){       console.log("a");     }     function b (){       console.log("b")     }     abc.add(a,b);//往回调函数里面传入要执行的函数     abc.fire()//执行回调

10、回调地狱问题；在一个函数里面会嵌套多层回调函数，导致不易于维护和新加功能；

设计模式里面有单一原则和开闭原则；一个函数最好执行一个功能，内部和外部是开闭的；

11、$,Deferred()管理回调

//编写一个事件状态管理函数，做一件异步的事情     function creat(){      var df = $.Deferred();      setInterval(function(){        var score = Math.random()*100        if (score > 60){          df.resolve();        }else if(score < 50){          df.reject();        }else{          df.notify()        }        //需要注意的是状态为done和fail的函数执行完之后就停止了，但是progress还需要再进行判断      },1500)      return df.promise();//返回df的注册事件，这样执行就放在函数内部执行，更加利于管理     }     var df = creat();     //注册完成之后的函数  resolve调用     df.done(function(){       console.log("done");     })     //注册失败之后的函数 reject 调用     df.fail(function(){       console.log("fail");     })     //注册进行中的函数  notify 调用     df.progress(function(){       console.log("progress");     })    

12、then是Deferred（）的核心内容

​         1、可以简化定义的写法

 //then可以简化写法    //定义函数的时候 传三个参数；done fail progress   //  df.then(function(){   //     console.log("done");   //     //这边return的传入到下一个then的done中函数的参数   //     return "done"   //  },function(){   //     console.log("fail");   //  },function(){   //     console.log("progerss");   //  }).then(function(prop){   //    console.log(prop)   //  })

​           2、then之后的注册是给之前then注册中return回来的方法的；

13、$.when工具方法

//$.when(df1,df2,df3).then(function(){},function(){})   //当df1，df2，df3都是done时执行function1 有一个是fail时执行function2
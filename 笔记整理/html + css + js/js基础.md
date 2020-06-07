> **js基础**
>
> **简介**
>
> 1、js的三个部分：一、ecmascript 标准  二、DOM 文档对象模型 三、BOM 浏览器对象模型
>
> **一、基本概念**
>
> **1、变量（是松散的，可以用来保存任何类型的数据）**
>
> type of 操作符可以检测出变量的类型（包括函数），操作符的值可以是变量也可以是数值字面量。
>
> typeOf(typeOf(a))// string ========> a可以是未定义的
>
> 1、js存储数据采用变量的方式，声明变量用var 存储数据，数据应该有对应的数据类型。函数中声明的变量在函数退出时会被销毁。
>
> **2、数据类型**：string number boolen undefined null object
>
> **2.1 undefined；**
>
> 只有一个值就是特殊的undefined。声明变量但未初始化的时候就是undefined；
>
> 注意：声明未初始化与未声明之间的区别（未声明的变量会报错）；在使用typeof操作符时，两者都会返回undefined值。
>
> **2.2 null；**
>
> 只有一个值的数据类型：null。表示一个空对象指针(type of 操作符返回值为Object)，定义的变量在将来用于保存对象，那么最好将该变量初始化为null。同时注意下与undefined的区别。
>
> 注意：null跟undefined进行相等性比较的时候返回为true；       
>
> **2.3 Boolean；**
>
> 两个字面值（true 和 false 注意：区分大小写）。使用Boolean（）函数可以将对应的值转换成boolean类型。注意点：undefined数据类型转换为false；0和NaN也会转换成false
>
> **2.4 Number；**
>
> 使用IEEE754格式来表示整数和浮点数。整数可以直接在代码中输入，算数计算时都会转换成10进制。
>
> 浮点数值需要的内存空间是整数的两倍，所以会将类似于10.0，1. 这样的浮点数会转换成整数。注意：浮点数的最高精度是17位小数，因此计算会存在误差（0.1+0.2=0.3是错误的）
>
> 数值范围；访问Number.MIN_VALUE为最小值，Number。MAX_VALUE为最大值。超出部分会表示为Infinity(有正负)，不参与运算。isFinite()函数可以检测是否在范围内。
>
> NaN；表示本来要返回数值的操作数未返回数值的情况（用来避免错误）比如0/0会返回NaN。实际上2/0返回Infinity，-2/0返回负无穷。
>
> ①任何涉及NaN的操作都会返回NaN；②不与任何数值相等（包括本身）；
>
> isNaN()检测是否不是数值，接受一个值会尝试转换成数值（true转换成1）所以isNaN（true）=false
>
> 数值转换：Number()、parseInt（）、parseFloat（）
>
> ------前者适用于任何数据类型，后两者专门用于把字符串转换成数值。
>
> `Number（”Hello World！“）=NaN Number（“”）=0 Number（“000000011”）=11 Number（true）=1 Number（null）=0 Number（undefined）=NaN`
>
> 实际中parseInt（）用的比较多一些，会解析数字字符或者符号--直到结束或者遇到一个非数字字符。
>
> parseInt（数值，进制）；转换数值的时候指定进制很有必要，否则‘“070”会被解析成70而不是八进制的56
>
> parseInt（”1234abv“）=1234 parseInt（”“）=NaN parseInt（22.5）=22 因为小数点并不是一个数字字符 parseInt（“00000234”）=234 parseInt（“0xf”）=15 十六进制 parseInt（“070”，8）=56  指定八进制
>
> 与parseInt（）类似的是praseFloat（）也是从第一个开始解析字符。但后者可以解析第一个浮点，在第二个浮点时停止。同时后者只解析十进制的数。
>
> parseFloat（“22.34.5”）=22.34 只解析第一个小数点
>
> parseFloat（“0XA”）=0 只进行10进制的转换
>
> **2.5 String；**
>
> 字符串类型。ECMAScript中的字符串是不可变的，要改变需要先销毁原来的字符串。（这个过程一般在后台发生）
>
> 数值、布尔值、对象、字符串都有toString()方法，null和undefined没有,可以使用String()函数，null返回"null" , undefined返回"undefined"。指定基数能够转化成不同进制。例如：
>
> ```javascript
> num=10; alert(num.toString()); //“10” alert(num.toString(2));//“1010” alert(num.toString(8));//“12”
> ```
>
> **2.6 Object类型**
>
> 对象其实就是一组数据和功能的集合。
>
> var o = new Object()；创建一个新的对象
>
> Object是所有对象的基础，所以都具有基本属性跟方法。这边常用的是toString（）和Valueof（）；
>
> **3、操作符（用来操作数据值）**
>
> **3.1一元操作符**
>
> 只能操作一个值的操作符。
>
> （一）递增和递减操作符
>
> 如果++在后面表示先参与运算再自身+1 ，如果++在前面表示先+1再参与运算
>
> 比如：
>
> `【num=10  num=num++  /11】; 【 num=10  sum=num++ +10 输出20】 num=10 sum=++num + 10 输出21`
>
> 递减和递增对于任何的值都适用；规则如下：
>
> ①数字字符串先转化成数值，非数值的字符串转化成NaN；再进行操作；
>
> ②true转换成1；false转换成0；再进行操作；
>
> ③对象先调用valueOf方法，获取一个可供操作的值。如果是NaN则在调用toString方法后应用前面的规则。对象变量变成数值变量。
>
> valueOf与toString的区别：
>
> \1. toString一定将所有内容转为字符串
>
> \2. valueOf取出对象内部的值，不进行类型转换
>
> 用途的差别：
>
> \1. valueOf专用于算数计算和关系运算
>
> \2. toString专用于输出字符串
>
> 共同的缺点：无法获取null和undefined的值
>
>   （二）一元加和减操作符
>
> 在数字类型时跟数学上的方法一样，在其他类型时会得到相应的转换；布尔值转换成0或者1；字符串转换成特殊格式；对象调用valueof或者是toString方法；
>
> **3.2、位操作符**
>
> 计算一个数值的二进制补码
>
> 第一步：这个数值的绝对值的二进制
>
> 第二步：这个二进制的反码（0换成1 1换成0）
>
> 第三步：得到的反码+1
>
> 18----------->二进制  00000000000000000000000000010010
>
> -------------->反码 11111111111111111111111111101101
>
> -------------->补码 反码+1 ==》11111111111111111111111111101110 表示-18
>
> 1.按位非 ~     返回数值的反码        ||本质是操作数负值减1
>
> var num1=25; var num2=~num1; console.log(num2);
>
> 2.按位与 &  将两个二进制的位置对其  || 只有都为1时才返回1 其他情况返回0
>
> var result=25&3; console.log(result); 25----> 11001 3-----> 00011 得到的结果就是 00001------>1
>
> 3.按位或 |   与按位与相同 只有都为0时才返回0  其余返回1；
>
> 4.按位异或 ^ 与按位或类似，区别在于当出现1的时候返回1 其他情况返回0；
>
> 5 左移 <<  将数值的所有位置向左移动指定的位数，右侧多出来的空位会用0填补；
>
> \6. 右移 
>
> （一）有符号右移 >>  保留符号位 其他位向右移动指定位置；
>
> （二）无符号右移>>>   所有的数值都向右移动指定位置；（负数的时候往往数值会很大、因为负数用的是补码表示）
>
> **3.3 布尔操作符**
>
> 非 ！相当于对布尔值求反。适用于任何数据类型；
>
> 与 &&  短路操作符 也就是意味着只要有一个false结果就为false
>
> 第一个为对象，返回第二个操作符
>
> 第二个为对象，只有第一个为真时返回第二个对象
>
> 两个都为对象，返回第二个操作符
>
> 有一个操作符为null，undefined，NaN 则会返回对应的null，undefined，NaN
>
> 或 || 短路操作符 只要有一个是true 则结果就为true
>
> 第一个操作数是对象，返回第一个操作数
>
> 第一个操作数为false，返回第二个操作数
>
> 两个操作数都是对象，返回第一个操作数
>
> 两个操作数都为null，NaN或者undefined 则返回对应的值
>
> 注意：短路操作符的意思是只要有一个值确定就能确定整体的值；这样能够避免未定义报错的情况
>
> 举例：var found=true; var result=(found || same);注意这边的 same未定义； alert(result) 不会报错，返回true
>
> 因此有了这样的表达式：
>
>  var myObject = preferredObject || backupObject //表示两个值里面先选前面的值，backupObject负责在preferredObject中没有有效值的时候提供后备值。
>
> **3.3 乘性操作符**
>
> 包括乘法、除法以及求模；
>
> **3.4 加性操作符**
>
> 包括+ 与 - 
>
> 需要注意的是，两个数字相加是正常的数学加法；两个字符串或者其中有一个是字符串（把另外一个转换成字符串）则会拼接
>
> 减法的时候如果有一个是字符串或者是null、undefined则先调用Number（）；
>
> 如果有对象则先调用ValueOf（）方法；加法当中是调用toString（）方法
>
> 以下是实例：
>
> ```javascript
> var josn={"name":"wanwgang","age":"10"}; var array=["1","2","3"]; function f1(){ }; var name="liulaogeng" console.log(josn.valueOf());//{"name":"wanwgang","age":"10"} console.log(josn.toString());//[object Object] console.log(array.toString());//1,2,3 console.log(array.valueOf());//(3)[1,2,3] console.log(f1.toString());// function f1() {} console.log(f1.valueOf());//f f1(){} console.log(name-1)//NaN
> ```
>
> **3.5 关系操作符**
>
> < > <= >=  返回布尔值；
>
> 【注意】：字符串比较的时候是比较其编码的大小
>
> 例如：var result ="23"<"3" // true  原因是"2"的字符编码是50  而"3"的字符编码是51
>
> 再者就是NaN与任何值比较都是false
>
> **3.6 相等操作符**
>
> 1、相等和不相等
>
> 比较前会先强制转换数据类型；
>
> 注意：null与undefined是相等的因为他们是类似的值，两个指向相同的对象也是相等的
>
> 2、全等和不全等（===）
>
> 比较之前不转换，其他与相等和不相等一样；null和undefined是不全等的。
>
> **4、语句**
>
> 1、if else
>
> 基本表达式： if(表达式){
>
> 代码块
>
> }else{
>
> 代码块
>
> }
>
> 2、do-while 循环：后测试循环语句，当循环体中的代码执行之后，才会测试出口条件；
>
> 基本表达式：do{
>
> 循环体
>
> }while(判断条件);
>
> 3、while 循环：前测试循环语句，在循环体中的代码执行之前，就会对出口条件求值；
>
> 基本表达式：var 计数器;
>
> while(表达式){
>
> 代码块
>
> }
>
> 4、for 循环
>
> 基本表达式：for（表达式1；表达式2；表达式3；）{
>
> 循环体
>
> }
>
> for循环其实跟while是一样的，循环内部定义的变量外部也可以访问到；同时以下代码表示无限循环
>
> for（；；）{ 循环体 }
>
> 5、for-in循环
>
> 用来枚举对象的属性；对象的变量值是null或者undefined时会报错，但是ecmascript5之后修复了
>
> ```javascript
> for ( var propName in window){
> 
> document.write(propName);
> 
> }
> ```
>
> 6、label语句；一般与循环语句配合使用；
>
> 基本表达式 label（标签名）：statement（代码块）；
>
> 7、break和continue
>
> countinue 表示遇到此行代码直接执行下一个循环；
>
> break表示遇到此行代码直接跳出循环；
>
> 8、with语句；作用是将代码的作用域设置到一个特定的对象中；主要是为了简化多次编写同一个对象
>
> 大量使用with语句会导致性能下降，同时会给调试代码造成困难，所以不建议经常使用
>
> ```javascript
> var qs =location.search.substring();
> 
> var hostName=location.hostname;
> 
> var url=location.href;
> 
> 使用with语句之后
> 
> with(location){ var qs = search.substring(); var hostName = hostname; var url = href; }
> ```
>
> 9、switch case 分支
>
> 基本表达式：switch(表达式){ case 值1:代码1;break; case 值2:代码2:break; ...... default:代码； }
>
> 如果值1与表达式相同，则执行代码1；否则跳出，对比值2与表达式的值。default相当于if里面的else
>
> 如果省略了break则会继续执行下一行的case，如果有意漏掉break需要添加注释；
>
> 可以在switch中使用任何数据类型，同时case也可以是变量或者表达式；
>
> ```javascript
> var num=25; switch(true){    case num<0:    console.log("less than 0.");        break;    case num<10 && num>0:        console.log("less than 10");        break;    case num >10 && num<20:        console.log("less than 20");        break;    default:        console.log("more than 20"); }
> ```
>
> **5、函数**
>
> 基本语法： function functionName(arg0,arg1...,argN){    statements; }
>
> 1、函数先定义再调用（重复的代码可以定义成函数）；严格模式下对函数有限制：
>
> 不能把函数名或者变量名命名成 eval或者arguments；
>
> 不能出现两个命名函数同名的情况
>
> 2、参数的理解：
>
> 命名的参数值提供便利，但不是必须的；
>
> 定义的函数有两个参数，但是可以传入任意个数的参数；
>
> 参数在内部是用一个数组来表示的，可以通过arguments对象访问这个参数的数组；arguments.length表示参数的长度；arguments索引的值永远与对应命名参数的值保持同步；
>
> 例如：function sayHi(){ alert(arguments[0]+argumengts[1]);//相当于数组的索引 }
>
> 没有传递值的命名参数将被自动赋予undefined的值；
>
> 3、函数的返回值，用return语句。如果定义了返回值，需要由变量接收；return也可以不带任何返回值，此时返回undefined值；遇到return会停止并立刻退出函数，后面的代码不执行；
>
> 4、函数没有重载；如果定义了两个名字相同的函数，那么该名字只属于后定义的函数；
>
> 例如： function addSomeNumber(num){ return num+10; } function addSomeNumber(num){ return num+200 } var result=addSomeNumber(200);//300
>
> 5、函数表达式：把一个匿名函数给一个变量 var f1 = function（）--函数的 自调用（声明的同时直接调用）
>
> 6、函数可以作为参数使用；function：f1（fn）{
>
> fn（）；
>
> }
>
> function：f2（）{
>
> 运行代码
>
> }
>
> f1（f2） 调用函数（此时f2作为参数）
>
> 7、作用域；局部作用域和全局作用域；作用域链：定义的变量按照作用域一级一级往上找。
>
> 8、预解析；会把变量的声明跟函数的声明提升到最前面（作用域的最前面）；注意只提前变量的声明，没有提前赋值。
>
> var a=b=c=10;预解析会把声明提前---------- var a; 
>
> ​           a=10
>
> ​            b=10;;(隐式声明)
>
> ​            c=10;;(隐式声明)
>
> 变量的提升、作用域：1、var定义的是全局的变量，在全局能够调用；
>
> 2、如果在函数中定义var变量，则是只有在函数中能够调用，出了函数会报错
>
> 3、函数中没有用var声明的变量默认是全局变量
>
> 变量的提升：变量和函数的声明会放到最前面进行，函数的优先级会高于变量的
>
> 例如：
>
> foo(); var a=true; function foo(a){    if(a){        console.log("a");    }else{        console.log("b");    } } 实际执行的时候如下； function foo(){    if(a){        console.log("a");    }else{        console.log("b");    } } var a; foo();//调用的时候其实a没有赋值； a=true;
>
> **二、变量、作用域和内存问题**
>
> **1、基本类型和引用类型的值**
>
> **基本类型值**：简单的数据段；保存在栈内存中    
>
> **引用类型值**：可能由多个值构成的对象；保存在堆内存中；
>
> js在操作对象时实际上是在操作对象的引用而非实际的对象。
>
> 复制变量的值：如果藏一个变量向另一个变量复制**【基本类型的值】**，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。
>
> var num1=5； var num2=num1；//num1 与 num2 中的5是完全独立的；
>
> 复制**【引用类型的值】，**这个值的副本其实是一个指针，复制结束后两个变量将引用同一个对象。
>
> ```javascript
> var obj1=new object(); var obj2 =obj1; obj1.name="nihao"; alert(obj2.name); //nihao
> ```
>
> 示意图：
>
> ![img](D:\YNote\jk3308@126.com\c0fafbce41a040af8817983466afbc61\clipboard.png)
>
> **理解传值**，数值传到栈里面，对象在堆里面开扩空间。对象名存储在栈里面，并以地址的方式表示，传递的时候是指向性的，也就是说对应的地址会指向相应的对象。
>
> 理解视频值类型与引用类型传递的过程。
>
> 基本类型：（简单类型）；number、string、boolean
>
> 复杂类型：object
>
> 空类型：null、undefined
>
> 基本类型的值在栈上、复杂类型的对象在堆上，地址（引用）在栈上
>
> 值类型之间传递的是值，引用类型之间传递的是引用
>
> **2、检测类型**
>
> 使用typeof 操作符可以检测是不是基本数据类型；使用引用类型的值时，用instanceof操作符可以检测是什么类型的对象；
>
> alert(person instanceof Object);//是否是Object alert(colors instanceof Array);//是否是Array alert(pattern instanceof RegExp);//是否是RegExp
>
> **3、执行环境及作用域**
>
> **执行环境**定义了变量或函数有权访问的其他数据，决定了它们各自的行为；在web浏览器中，全局执行环境被认为是------window对象
>
> 执行环境只有两种--全局和局部（函数）
>
> **作用域链：**保证对执行环境有权访问的所有变量和函数的有序访问。
>
> 查询标识符：在某个环境中为了读取或者写入而引用一个标识符时，必须通过搜索来确定该标识符实际代表什么。从作用域链的前端开始，向上逐级查询匹配的标识符。如果在局部环境中查询到，那么搜索过程停止。反之则继续沿作用域链向上搜索。
>
> 举例：var color = red; function getColor(){ var color = blue;  // 向上搜索到这里就停止了 return color; } alert(getColor());// blue  
>
> **4、垃圾收集**
>
> js具有自动收集垃圾的机制：找出那些不再使用的变量，然后释放其所占的空间。
>
> 有两种方式：
>
> 一、标记清除。所有进入环境的变量都加上标记，被引起就去除标记。随后清除带有标记的值并释放其空间；
>
> 二、引用计数；初始标记是1，赋值和引用时标记加一，当这个变量取得了另一个值，标记减一；标记为0时清除。
>
> **解除引用**：目的是为了优化内存占用。当数据不再有用，最好通过将其值设置为null来解除引用；局部变量在脱离环境之后自动解除引用；
>
> 举例： function createPerson(){ var localPerson = new Object(); localPerson,name=name; return localPerson;//脱离环境之后 localPerson会自动解除引用； } var globalPerson = createPerson("name"); globalPerson = null;//解除引用（globalPerson 为全局变量）
>
> **三、引用类型**
>
> **1、Object类型**
>
> 创建Object实例的两种方式： （1） var person =new Object（） （2）对象字面量表示法：属性之间用逗号隔开  var person ={    name="Nicholas",    age=29; }
>
> 可以使用方括号表示法来访问对象的属性；与点表示法的区别在于可以用变量的形式
>
> 举例: var propertyName="name"; alert(person[propertyName]) 再比如: person["first name"]="Nicholas"  属性名称中间有空格的时候；
>
> **2、Array类型**
>
> 2.1 每一项可以保存任何类型的数据。创建数组的两种方式：
>
> （1）var colors =nem Array();// 注意可以在括号里面指定数组的长度或者是数组的值 比如：var colors =new Array(6);//数组的长度为6；    var colors = new Array("red","blue","green")//创建了包含三个值的数组 （2）使用数组字面量的方式； var colors=["red","blue","green"] var colors=[]//空数组 var colors = [1,2,3,]//不要这样，会创建1项或2项或3项数组； var colors =[,,,,,,]//不要这样
>
> 值得注意的是，和对象一样在使用字面量的时候不会调用对应的函数
>
> lengtj属性用于存储数组的项数，有意思的是这个属性不是只读的；
>
> 举例： var colors=["red","green","yellow"] colors.length=2;//相当于设置数组的长度为2 ，删除了最后一项 alert(colors[2]);// undefined  colors[colors.length]=“black”//相当于在最后加一个项
>
> 2.2 array的检测
>
> 可以使用Array.isArray()来检测是否为数组，注意与instanceof的区别。（前者可以跨越执行环境）
>
> 2.3 转换方法；
>
> 有valueOf（）；toLocaleString（）；toString（）；
>
> valueOf()  返回数组本身
>
> toString()  返回由数组中的每个值的字符串形式拼接而成的一个以逗号分隔的字符串；
>
> toLocaleString() 返回的时候调用的是每一项的toLocaleString()方法
>
> 使用josn()方法可以用不同的分隔符来构建这个字符串；
>
> 如果数组中有一项是undefined或者是null 那么调用以上方法时以空字符串显示
>
> ```javascript
> 举例：var colors =["red","blue","green"] alert(color.toString());//red,blue,green alert(color.valueOf());//red,blue,green 为了创建字符串会调用toString（）方法 alert(color);//red,blue,green alert(color.josn(","))//red,blue,green alert(color.josn("||"))red||blue||green
> ```
>
> 2.4 栈方法：
>
> 栈是一种LIFO（后进先出）的数据结构，也就是最新添加的项最早被移除；ES中提供了push（推入）和pop（弹出）的方法实现类似栈的行为；
>
> 举例：var colors=new Array(); var count=colors.push("red","blue");//push 返回的是修改后数组的长度 console.log(count); var item = colors.pop();//弹出最后一项并减少数组长度，返回移除的值 console.log(item);
>
> 2.5 队列方法：
>
> 队列数据结构的访问规则是FIFO（先进先出），与栈方法类似ES提供了两个方法
>
> shift（）方法 移除数组的第一个项并返回该项
>
> unshift（）方法在数组前端添加任意个项并非返回新数组的长度；
>
> 2.6、重排序方法：
>
> reverse（）会翻转数组项的顺序，sort（）会按照升序的方式排列数组项目
>
> 【值得注意】sort（）方法会调用toString（）方法，然后比较字符串；因此其顺序可能会出现问题。可以添加参数（比较函数）
>
> 举例： function compare(value1,value2){ // 定义比较函数    if (value1?value2){        return 1;    }else if(value1< value2){        return -1;    }else {        return 0;    }    }    var values=[0,1,5,10,15];    values.sort(compare);//传入compare值    alert(values);
>
> 2.7 操作方法；
>
> concat();基于当前数组中的所有项创建一个新的数组；
>
> slice()；基于当前数组中的一个或多个项创建新的数组，不会影响原来的数组
>
> splice()；删除+插入+替换（取决于参数）
>
> ```javascript
> 举例：var colors =["red","blue","green","yellow"]; var concats=colors.concat(); // red,blue,green,yellow var concats2=colors.concat("blcak");red,blue,green,yellow,blcak; var slice1=colors.slice(2);// green,yellow;从指定位置后面的所有项 var slice2=colors.slice(1,3);// blue,green 从指定位置开始到指定位置结束 var splice1=colors.splice(0,2)// red,blue  第一个参数为起始位置，第二个参数为删除项数。返回删除的项； var splice2=colors.splice(0,0,"black");// 返回空数组 ，原数组在red和blue中插入black var splice3=colors.splice(0,1,"black")//返回 blue  原数组blue替换为black
> ```
>
> 2.8 位置方法
>
> ES5提供了两种方法：indexOf（）和lastIndexOf（）；
>
> indexOf（a，b）从开头向后寻找，返回索引位置(没有找到的情况下返回-1)；注意比较的时候用的是全等；
>
> lastIndexOf（）从末尾开始寻找。
>
> 参数a表示要寻找的值，参数b表示指定开始的位置；
>
> 举例： var numbers=[1,2,3,4,5,4,3,2,1]; var num1=numbers.indexOf(4); //3 var num2=numbers.indexOf(4,4);//5
>
> 2.9 迭代方法
>
> every();每一项运行给定函数，所有函数返回ture，则返回true
>
> filter()；每一项运行给定函数，返回函数为true的项
>
> forEach()；每一项运行给定函数，没有返回值；与for循环迭代数组相似
>
> map()；每一项运行给定函数，返回每次函数调用的结果组成的数组；
>
> some()；每一项运行给定函数，有一项为true则返回true
>
> 2.10 归并方法；
>
> reduce()he reduceright()  传入两个参数；一个在每一项上调用的函数和作为归并基础的初始值；函数有四个参数：前一个值、当前值、项的索引和数组对象；
>
> 举例： var value=[1,2,3,4,5]; var sum =value.reduce(function(prev,cur,index,array){ return prev+cur; }) console.log(sum);//15 第一次 prev=1 cur=2;第二次 prev=1+2 cur=3 第三次 prev=1+2+3 cur=4;->结束
>
> **3、Date类型**
>
> **4、regexp类型**
>
> es通过regexp类型来支持正则表达式。
>
>  var expression =/pattern/ flags;      flags标志用于表明正则表达式的行为；                                     g： 表示全局模式                                     i：表示不区分大小写                                     m：表示多行模式
>
> 正则表达式就是一个模式与上述三个标志的组合体；
>
> var  pattern1=/at/g; 匹配字符串中所有“at”的实例； var  pattern2=/[bc]at/i;匹配第一个bat 或者 cat，不区分大小写； 元字符包括： (  [ { \ ^ $ | ) ? * + .] }
>
> 模式中使用的元字符需要转义；
>
> 可以通过regExp来创建正则表达式；
>
> 举例： var pattern2= new RegExp("[bc]at","i"); 等价于上面用字面量创建的正则表达式； RegExp传递两个参数，第一个是要匹配的字符串模式，另一个是可选的标志字符串；
>
> 字面量创建与RegExp实例创建最大的不同是：字面量共用一个RegExp实例，而用构造函数创建的 每一个RegExp都是一个新的实例；
>
> 举例： var re=null; for (var i =0;i<10;i++){ re = /cat/g; re.test("catastrophe"); }//循环中再次调用test()方法会失败； for (var i =0;i<10;i++){ re = new RegExp("cat","g"); re.test("catastrophe"); }
>
> **4.1 实例属性**
>
> RegExp的每个实例都具有下列属性；
>
> global; 布尔值，表示是否设置了g标志；
>
> ignoreCase；布尔值，表示是否设置了i标志；
>
> lastIndex；整数，表示开始搜索下一个匹配项的字符位置，从0算起；
>
> multiline；布尔值，表示是否设置了m标志；
>
> source；政策表达式的字符串表示，按照字面量形式而非传入构造韩世忠的字符串模式返回；
>
> **4.2 实例方法**
>
> RegExp对象的 主要方法是exec()和test()
>
> **5、函数**
>
> 重要的概念：“函数是对象，函数名是指针；”
>
> **5.1 没有重载**
>
> function addSome(num){ return num+100; } function addSome(num){ return num+200; } addSome(100)//300  需要理解函数是对象，函数名是指针的概念
>
> **5.2 函数声明与函数表达式**
>
> 解析器会率先读取函数的声明，并使其在执行任何代码之前可用；至于函数表达式，必须等到解析器执行到它所在的代码行，才会真正被解释执行。
>
> 除了这一点，函数声明跟函数表达式的语法其实是等价的
>
> alert(sum(10,10)); function sum(num1,num2){    return num1+num2; }
>
> **5.3 函数内部属性**
>
> 两个特殊的对象 arguments和this；
>
> arguments是一个类数组对象，包含传入函数中的所有参数。其中有一个callee的属性；该属性是一个指针，指向拥有这个arguments对象的函数。看一个很重要的案例：
>
> 求阶层 function factorial(num){    if(num<=1){        return 1;    }else {        ① return num*factorial(num-1);//特别注意下这里用了跟函数名一样        ② return num*arguments.callee(num-1);//这里用了函数的指针代替    } } 注意看下区别： var sum=factorial; factorial=function(){    return 0; } sum(5);//125  如果这边用①中的方式，结果是0； factorial(5);//0
>
> this引用的是函数据以执行的环境对象；
>
> window.color="red"; var o={color:"blue"}; function sayColor(){ alert(this.color); } sayColor(); // red;    o.sayColor()=sayColor;  注意这里只是换个名字而已，指向是一样的 o.sayColor();  //blue
>
> **5.4 函数属性和方法**
>
> prototype属性十分重要（后续会讲到）对于es中的引用类型而言，prototype是保存他们的真正存在。
>
> apply（）和call（）方法实际上在设置函数体内this的值；传入两个参数：一、运行函数的作用域；二、参数数组。
>
> call 和 apply的区别在于接受参数的方式不同；使用call（）方法时必须把传递给函数的参数逐个举例出来。
>
> 最主要的应用是能够扩充函数的作用域。 window.color="red"; var o ={color:"blue"}; function sayColor(){ alert(this.color); } sayColor();//red sayColor.call(this); //red; sayColor.call(window);//red sayColor.call(o);//blue
>
> 还有一个方法时bind（）  会创建一个新的函数实例；并且其this值会被绑定。
>
> 举例：window.color="red"; var o ={color:"blue"}; function sayColor(){ alert(this.color); } var sayColor2=sayColor.bind(0); sayColor2();//blue;    因为bind的指向是o  并且绑定给了新的函数，所以新函数的指向也是o
>
> **6、基本包装类型**
>
> 每当读取一个基本类型值的时候，后台会创建一个对应的基本包装类型的对象；有
>
> 例如：  var s1="new"; var s2=s1.substring(2); 按照逻辑来说，基本类型的值是没有方法的。但后台会自动执行； 在后台执行的情况是： var s1=new String("new"); 创建string类型的一个实例 var s2=s1.substring(2);  调用指定的方法 s1=null; 销毁这个实例
>
> 引用类型与基本包装类型的主要区别就在于对象的生存期；new创建的引用类型的实例在作用域内一直保存；基本包装类型的对象值存在于一行代买的执行瞬间。
>
> **6.1 boolean类型**
>
> 理解基本类型与引用类型的区别：1、用typeof操作符，基本类型返回boolean 引用类型返回object；
>
> 2、用instanceOf操作符，基本类型返回false，引用类型返回true；
>
> 注意：这里boolean对象建议不要使用，因为很容易造成误解。
>
> **6.2 Number类型**
>
> var numberObject = new Number(10);
>
> 注意有几个方法，toFixed（）； toExponential（）；toPrecision（）；
>
> var num=10;
>
> alert(num.toFixed(2)); 10,00        传入一个参数，指定显示的小数位数，多的部分会舍入
>
> alert（num.toExponential（1））//1.0e+1          传入一个参数，用指数表示法
>
> toPrecision(3）//  10.0      传入一个参数，用指定的数字个数来表示数值
>
> 6.3 
>
> **数组**
>
> 1、一组有序的数据。可以一次性存储多个数据。
>
> 2、通过构造函数或者字面量定义。
>
> var 数组名=new Array();通过函数构造的数组， var arr=new Array(5);表示有5个数据，但是每个数据未定义。 var arr=new Array(5，10,15)；表示数组中有 5,10,15这三个数据。
>
> var 数组名=[];
>
> 可以通过索引来设置和找到数组
>
> 数组名[9]=10;设置数组中第10个数据为10；
>
> 冒泡排序（）重点内容
>
> **对象**
>
> 对象：指有特征和行为的特指的某个事物
>
> var 对象名 =new Object();
>
>  对象名.属性名=属性值（特征）
>
> 对象名.行为=函数（行为）
>
> 2、可以使用函数创建对象，可以设置参数变量，属于工厂模式创建对象。 
>
> 3、自定义构造函数创建对象；一般函数名首字母用大写
>
> function Person(name,age){
>
> ​			this.name=name;
>
> ​			this.age=age;
>
> ​			this.play=function(){
>
> ​				console.log("玩耍");
>
> ​			};
>
> ​		}//自定义构造函数完成；
>
> ​		var obj = new Person("小明",10);//调用自构造的函数，并创建对象
>
> ​		console.log(obj.name);
>
> ​		console.log(obj.age);
>
> ​		obj.play();
>
> 4、字面量创建对象：
>
> var obj={
>
> ​			name:"xiaoming",
>
> ​			age:10,
>
> ​			sayHi:function(){
>
> ​				console.log("我叫"+obj.name);
>
> ​			},
>
> ​			eat:"chifan"
>
> ​		};//类似于数组的方式创建对象；
>
> ​		console.log(obj.name);//对象的调用
>
> ​		console.log(obj.age);
>
> ​		obj.sayHi();
>
> 5、访问对象属性值的方法；①使用 “。”方法；obj.name="xiaoming";或者用[]的方式；
>
> obj["name"]=xiaoming
>
> 便利对象中的属性值，可以使用for 。。。in。。。循环；
>
> var json={
>
> ​			"name":"xiaoming",
>
> ​			"age":"10",
>
> ​			"sex":"男"
>
> ​		};
>
> ​		for (var key in json){
>
> ​			// 遍历对象中的数据，用for。。。in。。。循环；	
>
> ​			console.log(json[key]);//注意这里不能用json.key也不能写成json["key"]
>
> ​		};
>
> 7、内置对象
>
> js系统自带的对象可以在MDN网站里面查询
>
> string.indexOf(),
>
> 数组的方法 arr.push(值)；在最后加一个值返回数组长度
>
> arr.pop（）删除最后一个值，返回这个值
>
> arr.shift()删除最前面的一个值，返回这个值
>
> arr.unshift（）在最前面加一个值返回数组长度
>
> 8、基本包装类型
>
> 对象能够调用对象，普通变量是不能的
>
> 基本类型变量调用方法，然后会转换成对象--这个时候就是基本包装类型的对象
## Css总结

### 样式属性

#### 布局样式

> `display`
>
> `position`
>
> `float`
>
> `margin`
>
> `padding`

#### 非布局样式

> `font` `font-weight`  `font-size` `font-faimly` 
>
> `border` 
>
> `background`
>
> `box-shadow`  x轴偏移  y轴偏移    模糊程度 放大倍数  颜色  内或者外

##### **详细理解的几个样式 :**

* `opacity`  透明度；取0-1的数值； 这个属性用来设置透明度，会让整个盒子包括内容都变得透明；与其对应的是`transparent`属性值，后者只会让当前的元素透明；
* `z-index` 层级； 只能对定位元素起作用；默认情况下，子元素的层级要比父元素高，有浮动的元素层级要比标准文档流里面的高；定位元素比浮动元素的层级高；

层级上下文：表示层级的高低会在特定的环境下比较；父元素的层级往往起到决定作用；举个例子：

```css
 		.father{
            position:relative;
            width:200px;
            height: 200px;
            border:1px solid #222;
            z-index:10;
        }
        .test1{
            position:relative;
            width:100px;
            height: 100px;
          background-color: red;
          z-index:20;
        }
        .test2{
            position:relative;
            width:100px;
            height: 100px;
            background-color: #222;
            transform:translate(20px,-20px);
            z-index:30;
        }
        .father2{
            position:relative;
            width:200px;
            height: 200px;
            background-color: pink;
            z-index:15;
            transform:translate(60px,-60px);
        }
	
	/*html部分*/
	 <div class="father">
        <div class="test1"></div>
        <div class="test2"></div>
    </div>
    <div class="father2"></div>
```

<img src="C:\Users\江杰\AppData\Roaming\Typora\typora-user-images\image-20200508224123466.png" alt="image-20200508224123466" style="zoom:50%;" />

`father2`的层级看起来比较低，但是它比`test1 和 test2`的父级的层级要高；所以会覆盖在上面；

* `vertical-align` 行内元素对其方式；（只能作用在行级元素）

  > `vertical-align`只能作用于行内盒子（`inline` `inline-block` `table-cell`）这些；
  >
  > 属性值：
  >
  > * `top`把元素顶部跟行中元素最高处对齐； `bottom`同理
  > * `text-top`把元素顶部跟行中字符顶部对齐；`text-bottom`同理
  > * `baseline`把元素基线跟父元素基线对齐；
  > * `middle`把元素放在中间的位置；-- 让元素的中心点跟父元素的`baseline + x的一半高`对齐
  > * `inherit`继承父元素的该属性
  >
  > `inline-block`  的基线是正常流中最后一个（行盒子） `line box` 的基线，但是，如果这个 `line box` 里面没有 `inline boxes` 或者其 `overflow` 属性值不是 `visible`，那么其基线就是 `margin bottom` 的边缘。
  >
  > 常见的问题：
  >
  > 1. 行内元素里面添加了图片，默认会在图片底部留一段空隙；
  >    原因是默认情况下，元素对齐方式是跟行盒子的`baseline`对齐，一般来说就是`x`的底部那条线；所以在底部会有一段空隙；
  >    **解决办法：**
  >
  > > * 设置图片的`vertical-align`为`middle`  -- 让元素的中心跟行盒子的`baseline + x高度一半`的位置对齐；
  > > * 设置行盒的`font-size = 0`
  >
  > 2. `li`作为行内元素横向排列的时候，默认情况下最后一个`li`的底部会跟`baseline`对齐;
  >    可以通过设置`vertical-align:middle`让其都基于中线对齐；
  >

* `transform` 可以进行元素的转换；

> translate(x,y)  (可以单独指定x或者y方向)  -- 偏移量
>
> rotate()旋转 （可以指定xyz轴） -- 旋转角度  旋转之后整个坐标都会旋转，所以先旋转再缩放跟先缩放再旋转有可能产生的结果是不一样的；
>
> scale() (可以指定xyz轴)  -- 缩放
>
> perspective   转换为3D视图 (景深)
>
> transform-style:perserve-3d; 用3d模式渲染；

* `line-height`行高；对于单行文本垂直居中通常的做法是`line-height = height`

> 这么做的原理：先来看下line-height属性 -- 指的是行高；
>
> ```css
> /*css*/
>  div,body{
>             margin:0;
>             padding:0;
>         }
>        .father{
>         margin-top:20px;
>           border:1px solid red;
>             line-height:0;
>             font-size:12px;
>        }
>        .son{
>           border:1px solid black;
>           line-height:12px;
>           font-size:0;
>           margin-top:20px;
>        }
> 
> /*html*/
> <div class="father">test1</div>
>  <div class="son">test2</div>
> ```
>
> ![image-20200507081444246](C:\Users\江杰\AppData\Roaming\Typora\typora-user-images\image-20200507081444246.png)
>
> 可以看出，其实撑开盒子高度的不是`font-size`而是`line-height`，平常不写`line-height`是因为会识别里面内容（包括文字，图片等）的高度，然后将盒子撑开；
>
>   `line-height`有一个垂直居中性，就是内容和占据的空间是公用一条水平线的，也就是两边剩余的空间是平均分配的，所以当`line-height = height`的时候，文字内容会在中间；

如果要实现多行文本垂直居中对其：

+ 已知有多少行，然后让行高平均分配一下；
+ 父元素设置行高，子元素设置`inline-block vertical-align:middle`
+ 利用定位或者`padding`；

``` css
	.father{
            width:200px;
            height: 100px;
            border:1px solid #222;
            text-align:center;
            line-height:100px;
        }
        .son{
            line-height:20px;
            display:inline-block;
            vertical-align:middle;
        }

/*html*/
	<div class="father">
        <span class="son">
            1、内联样式：在标签的style属性中引入css，不推荐使用，不能复用
        </span>
    </div>
```

* `animation` 设置动画；通过设置关键帧`@keyframes`

  ```css
  @keyframes animation-name{
      from{};
      to{}
      /* from to 表示开始和结束两个状态
      	也可以通过百分比的方式进行控制
      */
  }
  ```

  

  > * `animation-name`  匹配设置的关键帧的名称
  >
  > * `animation-duration`动画持续时间
  >
  > * `animation-timing-function`  运动速度曲线
  >
  >   > liner
  >   > ease 
  >   > ease-in
  >   > ease-out
  >   > ease-in-out
  >   > cubic-bezier   --  贝塞尔曲线
  >
  > * `animation-delay` 动画的延迟
  >
  > * `animation-direction`  动画的执行方向
  >
  >   > `normal` 正常执行
  >   > `alternate`表示正常执行之后再反向执行 
  >
  > * `animation-iteration-count `动画的执行次数 (`infinate`表示无限次执行)
  >
  > * `step()`可以设置步数，让其在规定的时间里面按照多少步去执行；

* `transition`过度动画；用来监听状态的改变，并执行动画；

  跟`animation`的区别，后者更加的灵活，且可以设置多段动画效果，可以主动触发；

  前者只能被动触发，动画效果比较一般；

### 选择器

最基本的有以下几种：

> * 标签选择器
> * id选择器
> * 类选择器
> * 通配符选择器

衍生之后还有以下几种：

> * 后代选择器  div p  (表示div下面所有的p -- 包括孙子元素)
> * 子代选择器  div>p  (表示div下面所有的p  --  不包括孙子)
> * 交集  div.son  （类名为son的div标签）
> * 并集    div,p   (div 和 p 标签)
>
> * 兄弟节点  div+p  (div后面的第一个p兄弟标签 )
> * div~p  (div后面的所有p兄弟标签)
> * :root 根节点
> * p：first-child   需要先匹配到父元素，表示p是这个父元素的第一个子元素；
> * [target] 选择带有target属性的元素
> * a[src^="https"] 选择src属性值是https开头的a标签
> * a[src$="com"] 选择src属性值是com结尾的a标签
> * a[src*="www"] 选择src属性包含www的a标签
> * p：nth-child(2) 先匹配到父元素，表示该父元素的第二个子标签是p
> * p：nth-of-type(2) 先匹配到父元素，表示该父元素的第二个p标签 (这个p不一定是第二个子标签)
> * ：not(p)  表示除了p标签    not表示排除

### 样式权重

!important > 行间样式 > id选择器 > 类选择器 > 标签选择器 > 继承 

内联样式跟外部样式，如果选择器权重一样的话，就看哪个离得近；多个外部样式文件的话，如果权重一样，样式冲突，后面的会覆盖前面的；

权重可以叠加，但是一般前面跟后面是数量级的差距，所以起决定作用的还是前面的选择器的权重；如果前面的一样的话再比较后面的；

如果选择器权重一样，写在后面的样式会覆盖前面的样式；

### 盒子模型

可以通过`box-sizing`属性来选择盒子的模式；

> * content-box    标准盒模型（默认）
> * border-box    怪异盒模型

#### 标准盒模型：

一个标签可以理解为一个容器，里面能够盛放一些内容；容器由几个部分组成(由内向外)：

> * content  内容区域
> * padding  内边距
> * border  边框
> * margin  外边距

盒子的真实宽度 =  `width + padding + border` 注意左右两边的都有`padding+border`

#### 怪异盒模型

怪异盒模型跟标准盒模型的区别在于，设置了`width`那么这个宽度就是盒子真实的宽度；内容区的宽度需要用`width`去减`padding border`； 

如果`pddding`的值大于等于了`width`；会反向撑开盒子，这时候就会突破`width`的限制；

### 布局

#### 浮动

浮动：就是让元素脱离标准文档流，直到遇到父元素或者是具有浮动效果的元素的边框；

```css
float:none (默认)  left(左浮动)  right(右浮动)
```

添加浮动的元素会自动变成`block`元素；然后进行重新的布局和排列；我使用比较多的地方是在`ul>li`作导航栏的时候，然后让`li`元素浮动，就能够靠在一起；这里如果是把`li`设置成`inline-block`因为有换行，所以会把换行符解析成空格，这样的话每个`li`之间会有空隙；

浮动带来的问题：最常见的就是父元素高度塌陷问题；因为脱离了标准文档流，就不能够依靠子元素的高度撑开父元素，导致高度塌陷；这样对其他布局会有比较大的影响；

> 设置`float`之后不能再用`margin:auto`实现水平居中；

#### 清除浮动的方法：

1. ##### `clear:both` 

   表示两侧不允许有浮动； 利用这个属性，需要在需要清除浮动的最后面添加一个空标签，然后设置其`css`样式；

   > 这个方法会添加很多不必要的空标签，所以一般使用`:after`伪元素来作为这个标签；注意`before`不行

原理：

先附上一段代码，看下区别；

```css
/*css 部分*/
.father{
	border:1px solid red;
}
.son1{
	width:100px;
	height:100px;
	background-color:pink;
	float:left;
}
.son2{
	width:100px;
	height:100px;
	background-color:pink;
	float:left;
}
.father::before{
	content:"";
	display:block;
	clear:both;
}

/*html部分*/
<div class="father">
	<div class="son1"></div>
	<div class="son2"></div>
	<div class="son3"></div>
</div>
```

简单来说在后面加一个`div`空标签，`clear:both`属性表示两侧都不允许有浮动，在`son3`上设置该属性，就意味着`son2`相对于`son3`是没有浮动的，且`son3`相对于父元素`father`也没有浮动；这样意味着父元素必须留高度给`son3`，而`son3`和其他浮动元素相对是没有浮动的，所以`father`为了给`son3`高度，就需要撑开整个盒子；简单理解就是`son3`用自己把其他浮动的元素拉下来，撑开了父元素的高度；

* **注意**： 

  + 如果用`::before`元素是不行的，因为在最前面添加了一个清除浮动的标签，没有办法把其他浮动元素拉下来；

  + 需要用`block`标签；`inline`和`inline-block`都不行；

2. ##### 触发盒子的`BFC`

   `BFC`就是块级上下文，利用其清除浮动的原理就是`BFC`盒子不会影响到外面的盒子，不管内容如何变化；不会跟`float-box`区域重合；

   利用`BFC`可以实现 一、清除浮动；二、实现左侧固定右侧自适应的两栏布局；三、解决`margin`重合和穿透等问题；

   > 触发盒子`BFC`的条件：
   >
   > * 设置`overflow`不等于`visibility`
   >
   > * 设置`display` 不等于`block`
   >
   > * 设置`float`不等于`none`
   >
   > * 设置`position`等于`absolute`或者`fixed`

   ###### 1.清除浮动

   触发`BFC`，让其单独形成一个容器；给父元素加上相关的属性

   ```css
   float:left;
   display:inline-block;
   position:absolute;
   overflow:hidden;
   ```

   但是这些会影响到父元素的样式，或者布局；所以在确定不会影响之外，一般不使用；

   ###### 2. 设置两栏布局

   ```css
   /* css部分 */
   	.left{
              width:100px;
              height:100px;
              background-color: hotpink;
              float:left;
          }
          .right{
               height:200px;
               background-color: skyblue;   
               overflow:hidden;        
          }
   /*html部分*/
       <div class="left">LEFT</div>
       <div class="right">RIGHT</div>
   
   ```

   显示效果：

   ![image-20200506232728599](C:\Users\江杰\AppData\Roaming\Typora\typora-user-images\image-20200506232728599.png)

   利用`overflow:hidden`触发`BFC`，又因为`BFC`不会跟`float-box`重叠，所以右边的盒子会从左边盒子的右边界开始显示

   ###### 3. 解决`margin`重合和穿透等问题

   ```css
   /* css 部分*/
    .father{
              width:100px;
              height:100px;
              background-color: hotpink;
              margin-top:20px;
              /*overflow: hidden;*/
          }
          .son{
              margin-top:100px;
               height:50px;
               width: 50px;
               background-color: skyblue;         
          }
   /* html 部分*/
   <div class="father">
        <div class="son"></div>
    </div>
   ```

   <img src="C:\Users\江杰\AppData\Roaming\Typora\typora-user-images\image-20200506233159300.png" alt="image-20200506233159300" style="zoom:50%;" />                                   <img src="C:\Users\江杰\AppData\Roaming\Typora\typora-user-images\image-20200506233300421.png" alt="image-20200506233300421" style="zoom:50%;" />

左边是触发了`BFC`的样子，右边是没有；

`son`里面设置了`margin-top=100px`但是`father`没有设置；结果是把整个盒子压下来；这就是`margin`穿透；产生的原因现在还不知道，到时候再仔细研究下；

设置了`overflow:hidden`之后，就会呈现左边的样子。因为`father`的高度小，所以只设置了`margin-top=10px`；

`margin`重叠： `son`里面设置了`margin-top:10px` `father`里面设置了`margin-top:20px`，显示的效果是父盒子距离上`20px`子盒子贴着父盒子的上部；原因就是`margin`重合了，取了较大的一个值；利用`BFC`同样可以解决；

#### 定位

定位其实就是`position`以及相对应的`top left right bottom` 有以下属性值

> * static (默认值)
> * relative (相对定位)
> * absolute (绝对定位)
> * fixed (固定定位)
> * sticky (相对定位+固定定位)

1. `static`是默认值，就是按照标准的文档流布局；从左到右排列，块级元素独占一行；
2. `relative`相对定位，基于自身位置进行定位；会保留原来自身的位置；
3. `absolute`绝对定位，基于最近的有定位的父元素进行定位；不会保留自身原来的位置；
4. `fixed`固定定位，基于浏览器视口进行定位；不会随着滚动条翻滚；
5. `sticky`相对定位+固定定位； 可以设置在某一个范围内表现为`relative`，超出之后表现为`fixed`

关于`sticky`有几个例子：

```css
	   /* css代码 */
        .top{
            height:100px;
            border: 1px solid blue;
        }
        .father {
            height: 50px;
            border: 1px solid #222;
            position: sticky;
            top: 20px;
        }

        .son {
            height: 100vh;
        }
		
		/* html代码 */
		<div class="top">top</div>
        <div class="father">test1</div>
        <div class="son">test2</div>
```

设置`sticky`属性之后，必须要有`top right left bottom`作为门槛条件；初始表现形式为`relative`当页面滚动到元素距离视口的距离等于设置的值，就会表现为`fixed`；往回的过程也是一样的；

上面的例子中 `.father`设置了`top = 20px`，也就是当页面滚动到距离视口高度`20px`的时候就会表现为`fixed`模型；

#### 弹性盒子

把盒子变成弹性形式，可以方便完成布局；可以分为容器和项目（里面的内容）；设置成弹性盒子之后`float` `clear`  `vertical-align`将会失效；

**容器上的属性 :**

`flex-direction`  主轴的方向

> * row 默认值
> * column 竖向
> * row-reserve  反向
> * column-reserve  反向

`align-items` : 项目在交叉轴对其方式

> * flex-start 
> * flex-end
> * flex-center
> * stretch 默认值，占满整个盒子的高度
> * baseline 第一个项目的`baseline`对其

`justify-content`: 项目在主轴对齐方式

> * flex-start  默认值
> * flex-end 
> * center
> * space-around  两边对齐
> * space-between  平均分配剩余的空间

`flex-wrap` 换行方式

> * nowrap 默认值-不换行
> * wrap 换行
> * wrap-reserve 换行-换行之后在上面呈现

`align-content`  多根轴线对齐方式

> 属性值和`align-items` 一样

**项目上的属性 ：**

`order` 项目的顺序

> 数值越小排列越靠前

`flex-grow` 项目是否放大

> 可以填写数值表示放大倍数，默认值为0 表示不放大；

`flex-shrink` 项目缩小

> 可以填写数值表示缩小倍数，默认值为1 表示不缩小；

`flex-basic` 项目的基础比例

> 默认值为`auto` 可以填写类似于`10px`这样的单位，表示项目的基础尺寸为`10px`

`flex` 是上述三个属性的简写形式

> flex:0 1 auto;  默认值

`align-self` 单个项目交叉轴的对其方式

> 取值跟`align-items`一样，可以覆盖之前的`align-items`值；默认值为`auto`,表示继承项目的`aligen-items`值
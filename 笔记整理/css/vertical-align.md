`vertical-align`只能作用于行内盒子（`inline` `inline-block` `table-cell`）这些；

属性值：

* `top`把元素顶部跟行中元素最高处对齐； `bottom`同理
* `text-top`把元素顶部跟行中字符顶部对齐；`text-bottom`同理
* `baseline`把元素基线跟父元素基线对齐；
* `middle`把元素放在中间的位置；-- 让元素的中心点跟父元素的`baseline + x的一半高`对齐
* `inherit`继承父元素的该属性

`inline-block`  的基线是正常流中最后一个（行盒子） `line box` 的基线，但是，如果这个 `line box` 里面没有 `inline boxes` 或者其 `overflow` 属性值不是 `visible`，那么其基线就是 `margin bottom` 的边缘。

常见的问题：

1. 行内元素里面添加了图片，默认会在图片底部留一段空隙；
   原因是默认情况下，元素对齐方式是跟行盒子的`baseline`对齐，一般来说就是`x`的底部那条线；所以在底部会有一段空隙；
   **解决办法：**

> * 设置图片的`vertical-align`为`middle`  -- 让元素的中心跟行盒子的`baseline + x高度一半`的位置对齐；
> * 设置行盒的`font-size = 0`

2. `li`作为行内元素横向排列的时候，默认情况下最后一个`li`的底部会跟`baseline`对齐；

可以通过设置`vertical-align:middle`让其都基于中线对齐；
`transition`内置组件使用：

`transition`是`vue`的内置组件，用来过度动画；



* `props`
  + `name` 用于生成`css`过度类名
  + `appear` 是否在初始渲染时使用过度
  + `css` 是否使用`css`过度类，如果设置为否，只能通过组件事件触发注册的`js`钩子
  + `type`指定过度事件类型，`transiton`或者是`animation`
  + `mode`控制离开/进入过度的时间序列；
  + `duration` 指定过度的持续时间  {entry:number,leave:number}

* 事件

- - `before-enter`
  - `before-leave`
  - `before-appear`
  - `enter`
  - `leave`
  - `appear`
  - `after-enter`
  - `after-leave`
  - `after-appear`
  - `enter-cancelled`
  - `leave-cancelled` (`v-show` only)
  - `appear-cancelled`

* 用法

> 用法就是把要执行的动画元素用`transition`标签包裹起来，在渲染的时候页面是没有这个元素的；
>
> 设置`css`类名就可以拥有过度动画效果；有6个`class`切换;

1.  `v-enter` 定义进入过度的开始状态，在元素插入之前生效，在插入之后的第一帧移除
2. `v-entry-active` 定义过度生效的状态。在元素插入之前生效，在动画完成之后移除；设置进入的动画效果
3. `v-enter-to` 定义进入过度的结束状态，在元素插入之后的下一帧执行，在动画完成之后移除
4. `v-leave`定义离开过度的开始状态，在离开过度被触发的时候立即生效；下一帧被移除；
5. `v-leave-active`定义离开时候的过度动画；在离开过度被触发的时候立即生效，动画完成之后移除；
6. `v-leave-to`定义离开过度的结束状态，在离开过度被触发之后下一帧生效，在动画完成之后移除；

`v-`是默认添加的，如果定义了`name`属性，就需要设置`name`对应的`css`属性名；比如设置`name=fade`就可以把`css`类名改成`fade-enter`

* 举例

```html
 <transition name="fade">
 	<div class="example" v-if="show"> </div>
 </ transition>

.fade-enter-active{
  transition:transform .5s ease-in-out;
}
.fade-leave-active{
  transition:transform .5s ease-in-out;
}
.fade-enter,.fade-leave-to{
  transform:translateY(7.66rem);
}

<!--实现滑动进入和滑出的效果-->
```




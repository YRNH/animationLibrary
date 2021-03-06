# 常见的帧动画方式：
- GIF；
- css3 animation；
- javascript；
# GIF和css3 animation的不足：
1. 不能灵活控制动画的暂停和播放。（GIF、animation）
2. 不能捕捉到动画完成的事件。（GIF）
3. 不能对帧动画做更加灵活的扩展。
# js实现帧动画的原理
1. 如果有多张帧图片，用一个image标签去承载图片，定时改变image的src属性（不推荐）。
2. 把所有的动画关键帧都绘制在一张图片里，把图片作为元素的background-image，定时改变元素的background-position属性（推荐）。
设计一个库要经历一下四个过程
>需求分析—>编程接口—>调用方式—>代码设计
## 需求分析：
1. 支持图片预加载。
2. 支持2种动画播放方式，以及自定义没帧动画。
3. 支持单组动画控制循环次数（可支持无限次）。
4. 支持一组动画完成，进行下一组动画。
5. 支持每个动画完成后有等待时间。
6. 支持动画暂停和继续播放。
7. 支持动画完成后执行后调函数。
## 编程接口：
1. loadImage（imglist）预加载图片。
2. changePosition(ele,position,imageUrl)通过改变元素的background-position实现动画。
3. changeSrc(ele,imglist)通过改变image元素的src。
4. enterFrame(callback)    每一帧动画执行的函数，相当于用户可以自定义每一帧动画的callback。
5. repeat(times)动画重复执行的次数，times为空时表示无限次。
6. repeatForever()无限重复上次动画，相当于repeat()，更友好的一个接口。
7. wait(time)每个动画执行完后等待时间。
8. then(callback)动画执行完成后的后调函数。
9. start(interval)动画开始执行，interval表示动画执行的间隔。
10. pause()动画暂停。
11. restart()动画从上一次暂停处重新执行。
12. dispose()释放资源。
## 调用方式：
1. 支持链式调用，我们期待动词的方式描述接口，调用方式如下：
```
var animation = require('animation');
var demoAnimation = animation().loadImage(images).changePosition(ele,position).repeat(2).then(function(){
    console.log('动画执行完之后的回调');
})
demoAnimation.start(80);
```
## 代码设计:
1. 我们可以把 "图片预加载" -> "动画执行" -> "动画结束"等一系列操作看成一条任务链（数组）
####任务链有两种类型的任务：
a.同步执行完成的。
b.异步定时执行的(通过计时器或者raf)。
2. 记录当前任务链的索引。
3. 每个任务执行完毕后，通过调用next方法，执行下一个任务，同时更新任务链索引值。

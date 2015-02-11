# fyFramePlayer
mask's video player based on [FramePlayer](https://github.com/vagnervjs/frame-player)

##功能
允许在手机环境下不新开窗口播放视频，原理是不播放video，而是不断改变img的src值(base64序列)。视频需事先转换成json对象。

##参数释义
* rate: 10,                 //每秒播放几帧
* fixedSize:true,			  //如为true，动画宽高根据jquery选择的元素宽高；如为false，则根据屏幕宽度100%设定动画高度，此时忽略width和height参数
* movieName:movieYaodou,    //动画名称，也是变量名。这个是必须值，否则找不到动画内容。支持多个动画连续播放，以逗号分隔
* playTimes:1,			  //如果有playTimes，则播放n次后会调用onPlayEnd()并停止
* onPlayEnd: function(){}	  //动画完成后回调


##调用示例
yaodou.js  anniu.js zhonghua.js  均为动画
```
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script src="fyFramePlayer.js"></script>
<script src="yaodou.js"></script>
<script src="anniu.js"></script>
<script src="zhonghua.js"></script>
<script>
  $('#player1').fyFramePlayer({
    rate: 10,
    fixedSize:true,
    playTimes:2,
    movieName:'movieYaodou,movieAnniu,zhonghua',
    onPlayEnd: function(){}
  });

   $('#player2').fyFramePlayer({
    rate: 10,
    fixedSize:false,
    // playTimes:0,
    movieName:'movieAnniu',
    onPlayEnd: function(){}
  });
</script>
```

##使用注意事项：
* 动画后缀为js,且必须给此动画命名。如anniu.js里  var movieAnniu={"frames":["da...  然后在调用时movieName就写movieAnniu
* js文件调用顺序必须保证动画文件在前，调用动画在后
* 还没想好。。。
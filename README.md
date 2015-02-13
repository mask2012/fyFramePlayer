# fyCountDown

##功能
倒计时插件

##参数释义
* countdownSeconds:20,     //默认倒数10秒
* alwaysShown:'',          //默认如果最大单位变为0后不再显示
* addZero:true,            //默认如果数字为个位数，会在前边加0
* onlySeconds:false,       //默认不只倒计时秒数
* notySeconds:10,          //默认倒计时提醒为10秒
* notyClass:'notifing',    //默认倒计时提醒class为nitifing
* unit:{                   //默认倒计时单位文字为天，时，分，秒
    d:'天',
    h:'时',
    m:'分',
    s:'秒'
  },
* onFinish:function(){}    //默认倒计时完成后回调为空


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
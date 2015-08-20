/*
 * jQuery fyFramePlayer1.0
 *
 * Copyright 2015 Mask
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
	rate: 10,                 //每秒播放几帧
	delay: 1300,			  //第一帧延迟一段时间后开始播放
	fixedSize:true,			  //是否为固定宽高,如果false，则根据屏幕宽度100%设定动画高度，避免动画变形,此时忽略width和height参数
	movieName:movieYaodou,    //动画名称，也是变量名。这个是必须值，否则找不到动画内容
	playTimes:1,			  //如果有playTimes，则播放n次后会调用onPlayEnd()
	isMovie:false,            //默认不是影片，一旦为true，会自动加上影片播放按钮，并且会自动查找影片的音源
	stopOnFinish:false,		  //播放完成后是否停止在最后一帧，默认为false
	onPlayEnd: function(){}	  //动画完成后回调
 *
 */

;(function($){
	$.fn.fyFramePlayer=function(options){
		var opts=$.extend({   //整合默认参数和自定义参数
			rate: 10,
			delay: 0,
			fixedSize:true,
			// movieName:movieYaodou,
			playTimes:0,
			stopOnFinish:false,
			isMovie:false,
			onPlayEnd: function(){}
		},options);

		var divCont=this; 			 //jquery插件的对象
		var firstPlay=0;  			 //firstPlay 标识是否第一次执行init函数
		var moviePlaying=false 		 //是否正在播放中 


		var init = function() {
			//定义变量
	        var img = document.createElement('img'),
	        span = document.createElement('span'),
            i = -1,
            j=0,
            canPlay=true,      //canPlay 控制播放几次的标识
            tempMovie=[],
            tempMovieName;

            //创建元素
            img.setAttribute('class', 'fp-img');
	        img.style.opacity = 0;
	        span.setAttribute('class', 'ico_player');
	        divCont.html('');
	        divCont.append(img);
	        divCont.append(span);
	        
	        

            //处理movieName参数
            tempMovieName = opts.movieName.split(',');
            if(tempMovieName.length==1){
            	if(window[tempMovieName[0]]!=undefined){
	            	tempMovie=tempMovie.concat(window[tempMovieName[0]].frames);
	            }else{
	            	console.error(tempMovieName[0]+' does not exist, please check !');
	            }
            }else{
            	for(i=0;i<tempMovieName.length;i++){
            		if(window[tempMovieName[i]]!=undefined){
		            	tempMovie=tempMovie.concat(window[tempMovieName[i]].frames)
		            }else{
		            	console.error(tempMovieName[i]+' does not exist, please check !');
		            }
            	}
            }

	        //处理fixedSize参数
	        if(opts.fixedSize){
	        	img.style.width = '100%';
            	img.style.height = '100%';
            }else{  
            	divCont.width('100%');
            	divCont.height('auto');
            	img.style.width = '100%';
            	img.style.height = 'auto';
            }

            //处理isMovie参数
            if(opts.isMovie){
            	divCont.find('span').fadeIn(100);  // 播放按钮显示
            	if(opts.movieSound){
	            	divCont.append('<div style=display:none><audio src='+opts.movieSound+' preload="auto"></audio></div>');   //创建audio dom
	            	divCont.find('audio')[0].load();                             //主动加载mp3
					divCont.find('audio')[0].addEventListener('canplaythrough', function(){   //加载mp3完成后绑定点击事件。
						divCont.find('span').unbind('click');
						divCont.find('span').bind('click', function() {
							a.start();
							divCont.find('audio')[0].play();
						});
					}, false);
				}else{
					divCont.find('span').unbind('click');
					divCont.find('span').bind('click', function() {
						a.start();
					});
				}
            }

	        var playIt=function (){
	        	divCont.find('span').hide();
	            setTimeout(function(){
                    i++;
                    moviePlaying=true;
                    if (i >= tempMovie.length) {
                        i = 0;
                        j++;
                        if(j==opts.playTimes){
                            canPlay=false;
                            moviePlaying=false;
                            opts.onPlayEnd(); //停止后执行回调


                            if(opts.isMovie){
                            	img.src = tempMovie[0];
                            	divCont.find('span').fadeIn(100);
                            }else if(opts.stopOnFinish){
                            	img.src = tempMovie[tempMovie.length-1];
                            	return;
                            }else{
                            	img.src = '';
                            	divCont.html('');
                            	return;
                            	//divCont.html(''); //停止后清空元素，以备后续再次调用时生成新元素
                            }

                            console.log(img);
                        }
                    }

                    img.src = tempMovie[i];   //正常播放中，i为每一帧

                    if(i>0){
                    	img.style.opacity = 1;
                    }
                    if(canPlay){
                    	playIt();
                    }
	            }, Math.round(1000 / opts.rate));
	        }


	        if(tempMovie.length!=0){      //影片有内容时
	        	img.src = tempMovie[0];   //先播放第一帧
	        	if(opts.delay!=0){        //如果有delay参数，执行delay参数，否则直接播放
	        		setTimeout(function(){playIt()},opts.delay);
	        	}else if(opts.isMovie){
	        		img.style.opacity = 1;
	        		if(firstPlay){
	        			playIt();
	        		}
	        	}else{
	        		playIt();
	        	}
	        	
	        }

	        firstPlay+=1;


		};

		init();

		this.start=function(){
			if(!moviePlaying){
				init();
			}
		}

		return this;

	}
})(jQuery);


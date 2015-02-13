/*
 * jQuery fyCountDown1.0
 *
 * Copyright 2015 Mask
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 *
 */

;(function($){
	$.fn.fyCountDown=function(options){
		var opts=$.extend({
			countdownSeconds:20,     //默认倒数10秒
			alwaysShown:'',          //默认如果最大单位变为0后不再显示
			addZero:true,            //默认如果数字为个位数，会在前边加0
			onlySeconds:false,       //默认不只倒计时秒数
			notySeconds:10,          //默认倒计时提醒为10秒
			notyClass:'notifing',    //默认倒计时提醒class为nitifing
			unit:{                   //默认倒计时单位文字为天，时，分，秒
				d:'天',
				h:'时',
				m:'分',
				s:'秒'
			},
			onFinish:function(){}    //默认倒计时完成后回调为空
		},options);


		var t1,container=this;
		var startCountDown= function(intDiff) {
		    clearInterval(t1);
		    t1 = window.setInterval(countDown, 1000);
		    countDown();

		    function countDown() {
		    	//countdown core
		        var day = 0,
		            hour = 0,
		            minute = 0,
		            second = 0; //时间默认值
		        if (intDiff > 0) {
		            day = Math.floor(intDiff / (60 * 60 * 24)); 
		            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
		            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
		            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		        }

		        //add zero
		        if(opts.addZero){
			        if (minute <= 9) minute = '0' + minute;
			        if (second <= 9) second = '0' + second;
		        }


		        //countdown mode
		        if(opts.alwaysShown!='d' && opts.alwaysShown!='h' && opts.alwaysShown!='m' && opts.alwaysShown!='s' && !opts.onlySecond){
		        	container.html('');
		        	if(day>0){
		        		container.append('<span class=\"countdown_day\">'+day+'</span>'+'<span class=\"countdown_unit countdown_unit_day\">'+opts.unit.d+'</span>');
		        	}
		        	if(hour>0){
		        		container.append('<span class=\"countdown_hour\">'+hour+'</span>'+'<span class=\"countdown_unit countdown_unit_hour\">'+opts.unit.h+'</span>');
		        	}
		        	if(minute>0){
		        		container.append('<span class=\"countdown_minute\">'+minute+'</span>'+'<span class=\"countdown_unit countdown_unit_minute\">'+opts.unit.m+'</span>');
		        	}
		        	container.append('<span class=\"countdown_second\">'+second+'</span>'+'<span class=\"countdown_unit countdown_unit_second\">'+opts.unit.s+'</span>');
		        }else if(opts.alwaysShown=='d'){
		        	container.html('');
	        		container.append('<span class=\"countdown_day\">'+day+'</span>'+'<span class=\"countdown_unit countdown_unit_day\">'+opts.unit.d+'</span>');
	        		container.append('<span class=\"countdown_hour\">'+hour+'</span>'+'<span class=\"countdown_unit countdown_unit_hour\">'+opts.unit.h+'</span>');
	        		container.append('<span class=\"countdown_minute\">'+minute+'</span>'+'<span class=\"countdown_unit countdown_unit_minute\">'+opts.unit.m+'</span>');
	        		container.append('<span class=\"countdown_second\">'+second+'</span>'+'<span class=\"countdown_unit countdown_unit_second\">'+opts.unit.s+'</span>');
		        }else if(opts.alwaysShown=='h'){
		        	container.html('');
	        		container.append('<span class=\"countdown_hour\">'+hour+'</span>'+'<span class=\"countdown_unit countdown_unit_hour\">'+opts.unit.h+'</span>');
	        		container.append('<span class=\"countdown_minute\">'+minute+'</span>'+'<span class=\"countdown_unit countdown_unit_minute\">'+opts.unit.m+'</span>');
	        		container.append('<span class=\"countdown_second\">'+second+'</span>'+'<span class=\"countdown_unit countdown_unit_second\">'+opts.unit.s+'</span>');
		        }else if(opts.alwaysShown=='m'){
		        	container.html('');
	        		container.append('<span class=\"countdown_minute\">'+minute+'</span>'+'<span class=\"countdown_unit countdown_unit_minute\">'+opts.unit.m+'</span>');
	        		container.append('<span class=\"countdown_second\">'+second+'</span>'+'<span class=\"countdown_unit countdown_unit_second\">'+opts.unit.s+'</span>');
		        }else if(opts.alwaysShown=='s'){
		        	container.html('');
	        		container.append('<span class=\"countdown_second\">'+second+'</span>'+'<span class=\"countdown_unit countdown_unit_second\">'+opts.unit.s+'</span>');
		        }else if(opts.onlySecond){
		        	container.html('');
	        		container.append('<span class=\"countdown_second\">'+intDiff+'</span>'+'<span class=\"countdown_unit countdown_unit_second\">'+opts.unit.s+'</span>');
		        }else{
		        	console.info('setting alwaysShown given wrong!');
		        	clearInterval(t1);
		        }

		        intDiff--;

		        //add noty class
		        if(opts.notySeconds!=0 && !isNaN(opts.notySeconds)){
			        if (intDiff < opts.notySeconds) {
			            container.addClass(opts.notyClass);
			        }
		        }else if(isNaN(opts.notySeconds)){
		        	console.info('notySeconds given wrong!');
		        	clearInterval(t1);
		        }

		        //on finish
		        if (intDiff < 0) {
		            clearInterval(t1);
		            opts.onFinish();
		            container.removeClass(opts.notyClass);
		        }
		    }
		}
		startCountDown(opts.countdownSeconds);


	}
})(jQuery);


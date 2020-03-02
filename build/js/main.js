// JavaScript Document
var headurl = "/shop";
// var headurl = "/api/shop";
$(document).ready(function(){
	/*setTimeout(function () {
	    pushHistory()
	    window.addEventListener("popstate", function (e) {
	      lll("popstate"+window.history.state)
	      if (window.history.state != null && window.history.state.url != "") {
	        location.href = window.history.state.url
	      }
	    });
	  }, 300);*/
	/*$('table tr').each(function(i,o){
	    var $t=$(o).find('td:not(:last)');
	    for(var i=0;i<$t.length;i++){
	    	var content=$.trim($($t[i]).html());
	    	if(content.length>20){
	    		$($t[i]).addClass('tdactive');
			}
			if($($t[i]).hasClass('tdactive')){
				$($t[i]).attr("title",content)
			}
	    }
	});*/
	//table-hover 鼠标移动tr变色
	$('.table-hover tr:not(:first)').hover(function(){
		$(this).addClass('highlight');
	}, function(){
		$(this).removeClass('highlight');
	});
	
	$('.table-hover tr:last td').css('border-bottom','1px #F1F0F0 solid');
	//placeholder
	$('body').on('focus','input textarea',function(){
		$(this).attr('placeholder','').focus();
	});
	$('body').on('blur','input textarea',function(){
		if(!$(this).val()){$(this).attr('placeholder','').blur();}
	});
	//解决ie下readonly删除回退时间
	$("input[readOnly]").keydown(function(e) {
        e.preventDefault();
	});
    /*专家移入边框变色 */
    $('.expertSection ul li').hover(function(){
    	$(this).addClass('border')
    },function(){
    	$(this).removeClass('border')
    })
    /*U计划 移入边框变色 */
    $('.uSection ul li').hover(function(){
    	$(this).addClass('border')
    },function(){
    	$(this).removeClass('border')
    })
    
});
$(function(){
	/*$.ajax({
		url:"/iext/share/localconfig/LocalConfigController/localConfig.do",
		type:'get',
		success:function(data){
			if(data.success==1){
				
			}
		}
	})*/
})
//返回之前没页面则返回首页
/*function pushHistory() {
  if (history.length < 2) {
    var state = {
      title: "index",
      url: getHttpPrefix + "http://xyg.idaqi.vaneqi.com"
    };
    window.history.pushState(state, "index", location.href);
    state = {
      title: "index",
      url: ""
    };
    window.history.pushState(state, "index", "");
  }
  
}*/
/*验证小数*/
function checkFloat(number) {
	var regu = /^-?(\d+|[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/; // 小数测试
	if (regu.test(number)){
		return true;
	}else{
		return false;	
	}
}
/*验证正整数*/
function checkInt(number) {
	var regu = /^\d+$/; // 小数测试
	if (regu.test(number)){
		return true;
	}else{
		return false;	
	}
}
//回到顶部
function backTotop(){
	$('body,html').animate({scrollTop:0},100);
};
//刷新页面
function pageReload(){
	window.location.href=window.location.href;
}
//转跳页面
function locationTo(url){
	if(url) location.href = url
}
//关闭页面
function pageClose() {
	if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {  
        window.location.href="about:blank";  
        window.close();  
    } else {  
        window.opener = null;  
        window.open("", "_self");  
        window.close();  
    }  
}
//计算输入框字的长度 公用
function sumLen(me,maxlen){
	var sumlen=$.trim($(me).val()).length;
	if(sumlen>maxlen){
		$(me).parent().find('.num-tip span').html(sumlen).css("color","red");
		$(me).val($(me).val().substring(0,maxlen));
		$(me).parent().find('.num-tip span').html(maxlen);
	}else{
		$(me).parent().find('.num-tip span').html(sumlen).css("color","#333");
	}
}
//计算输入框的长度  公用全
(function($) {
    $.fn.sumLength = function(opts) {
        var defaults = {
            maxNumber: 140, //允许输入的最大字数
            onOk: function() {}, //输入后，字数未超出时调用的函数
            onOver: function() {} //输入后，字数超出时调用的函数   
        }
        var option = $.extend(defaults, opts);
        this.each(function() {
            var _this = $(this);
            _this.val($.trim(_this.val()));
            $(this).parent().find('.num-tip .maxSpan').html(option.maxNumber);
            var numSpan=$(this).parent().find('.num-tip .numSpan');
            numSpan.html(_this.val().length);
            var fn = function() {
            	numSpan.html(_this.val().length);
                if (_this.val().length <= option.maxNumber) {
                	numSpan.css('color','#666');
                    option.onOk();
                } else {
                	numSpan.css('color','red');
                	_this.val(_this.val().substring(0,option.maxNumber));
                	//numSpan.html(_this.val().length);
                    option.onOver();
                }
            };
            var inputBlur=function(){
            	_this.val($.trim(_this.val()));
            	numSpan.html(_this.val().length);
            }
            //绑定输入事件监听器
            if (window.addEventListener) { //先执行W3C
                _this.get(0).addEventListener("input", fn, false);
                _this.get(0).addEventListener("blur", fn, false);
                _this.get(0).addEventListener("blur", inputBlur, false);
            } else {
                _this.on("onpropertychange", fn);
            }
            if (window.VBArray && window.addEventListener) { //IE9
                _this.on("onkeydown", function() {
                    var key = window.event.keyCode;
                    (key == 8 || key == 46) && fn(); //处理回退与删除
                });
                _this.on("oncut", fn); //处理粘贴
            }
        });
    }
})(jQuery)


/*自动查询翻页*/
function dosearchuser(page,obj){
	var data={};
	for(var i=0;i<obj.opts.paramname.length;i++){
		data[obj.opts.paramname[i]]=$(obj.opts.otherparam[i]).val()
	}
	data[obj.opts.currentname]=$(obj).val();
	data.pageCur=page;
	$.ajax({
		url:obj.opts.url,
		type:'post',
		data:data,
		success:function(data){
			$(obj.opts.showobj).html(data);
		}
	})
}

/*验证是否含有flash*/
function flashChecker() {  
    var hasFlash = 0;         //是否安装了flash  
    var flashVersion = 0; //flash版本  
    var isIE = /*@cc_on!@*/0;      //是否IE浏览器  
    if (isIE) {  
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');  
        if (swf) {  
            hasFlash = 1;  
            VSwf = swf.GetVariable("$version");  
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);  
        }  
    } else {  
        if (navigator.plugins && navigator.plugins.length > 0) {  
            var swf = navigator.plugins["Shockwave Flash"];  
            if (swf) {  
                hasFlash = 1;  
                var words = swf.description.split(" ");  
                for (var i = 0; i < words.length; ++i) {  
                    if (isNaN(parseInt(words[i]))) continue;  
                    flashVersion = parseInt(words[i]);  
                }  
            }  
        }  
    }  
    return { f: hasFlash, v: flashVersion };  
}

//日期加天数的方法
//dataStr日期字符串
//dayCount 要增加的天数
//return 增加n天后的日期字符串
function dateAddDays(dataStr,dayCount) {
  var strdate=dataStr; //日期字符串
  var isdate = new Date(strdate.replace(/-/g,"/"));  //把日期字符串转换成日期格式
  isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //日期加1天
  var pdate = isdate.getFullYear()+"-"+(isdate.getMonth()+1)+"-"+(isdate.getDate());   //把日期格式转换成字符串

  return pdate;
}

//获取数据
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	}
/*验证账号*/
function checkaccount(obj){	
	var checkaccount=/^[_0-9a-zA-Z\s]{1,20}$/;
	if(checkaccount.test($(obj).val())){
		return true;
	}else{
		tipError("账号必须是1到20位的数字、字母和下划线的组合！");
		return false;
	}
}
/*验证密码*/
function checkpwd(obj){
	var checkpwd=/^[_0-9a-zA-Z]{6,20}$/;
	if(checkpwd.test($(obj).val())){
		return true;
	}else{
		tipError("密码必须是6到20位的数字、字母和下划线的组合！");
		return false;
	}
}
/*验证确认密码*/
function checkrepwd(obj,reobj){
	if($(reobj).val()==''){
		tipError("确认密码必须填")
	}else if(checkpwd(obj)&&$(obj).val()==$(reobj).val()){
		return true;
	}else{
		tipError("确认密码必须和密码相同！");
		return false;
	}
}
/*多个不全为空字符*/
function notallempty(msg){
	var e=/^\s*$/;
	if(arguments.length>1){
		for(var i=1;i<arguments.length;i++){
			if($(arguments[i]).val()==''||e.test($(arguments[i]).val())){
				return false;
			}
		}
	}
	return true;
}
/*验证数字*/
function checkNum(obj,msg){
	var e=/^\d+$/;
	if(e.test($(obj).val())){
		$(obj).removeClass('border-red').focus();
		return true;
	}else{
		tipError(msg);
		$(obj).addClass('border-red').focus();
		return false;
	}
}
/*验证小数*/
function isNum(obj,msg) {
	 var regu = /^\d+(\.\d+)?$/; // 小数测试
	 if (regu.test($(obj).val())){
	  $(obj).removeClass('border-red');
	  return true;
	  }
	 else{
	  tipError(msg);		
	  $(obj).addClass('border-red').focus();
	  return false;
	 }
}
/*验证不能为空字符*/
function checkempty(obj,msg){
	$(obj).val($.trim($(obj).val()));
	var e=/^\s*$/;
	if($(obj).val()==''||e.test($(obj).val())){
		tipError(msg);
		$(obj).addClass('border-red').focus();
		return false;
	}else{
		$(obj).removeClass('border-red');
		return true;
	}
}
/*验证money*/
function checkMoney(obj,msg){
	var e= /^[0-9]+(\.[0-9]{1,2})?$/;
	if(!e.test($(obj).val())){
		tipError(msg);
		$(obj).addClass('border-red').focus();
		return false;
	}else{
		$(obj).removeClass('border-red');
		return true;
	}
}
/*验证字符不能超过指定长度*/
function checklength(obj,len,msg){
	$(obj).val($.trim($(obj).val()));
	if($(obj).val().length>len){
		$(obj).addClass('border-red').focus();
		tipError(msg);
		return false;
	}
	else{ 
		return true;
		$(obj).removeClass('border-red');
	}
}
/*验证联系号码*/
function checktel(obj,flag){
	var mobiletest=/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|18[0123456789][0-9]{8}|17[0678][0-9]{8}|14[57][0-9]{8})$/;
	var tel=/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[0-9]{10}$)/;
//	/*判断是否必须填写*/
	if(flag){
		flag=checkempty(obj,'联系号码必须填写！');
	}
	if(flag){
		var phone=$(obj).val();
		if(mobiletest.test(phone)||tel.test(phone)){
			return true;
		}else{
			tipError("请填写正确的联系号码！");
			return false;
		}
	}else{
		return true;
	}
}
/*验证手机号码
 	<p> 参数说明：
		obj：验证对象
		checkNull：是否验证为空
		delSpace：是否去除首位空格
*/
function checkmobile(obj,checkNull){
	var val=$.trim($(obj).val());
	$(obj).val(val);
	if(checkNull&&val==''||/^\s*$/.test(val)){
		tipError('手机号码不能为空');
		return false;
	}
	else{
		var mobiletest=/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|18[0123456789][0-9]{8}|17[0678][0-9]{8}|14[57][0-9]{8})$/;
		if(mobiletest.test(val)){
			return true;
		}else{
			tipError("请填写正确的手机号码！");
			return false;
		}
	}
}
/*验证邮箱
 	<p> 参数说明：
		obj：验证对象
		checkNull：是否验证为空
		delSpace：是否去除首位空格
*/
function checkemail(obj,checkNull){
	/*首位空格*/
 	var val =$.trim($(obj).val());
 	$(obj).val(val);
	/*判断是否必须填写*/
	if(checkNull&&val==''||/^\s*$/.test(val)){
		tipError('邮箱不能为空');
		return;	
	}
	else{
		var e=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(e.test(val)){
			return true;
		}else{
			tipError("请填写正确的邮箱！");
			return false;
		}
	}
}
/*提醒方式，方便以后换提醒方式*/
function tip(msg){
	alert(msg);
}
/*js时间格式化  fmt（时间格式yyyy-MM-dd HH:mm:ss）*/
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/*获取文件后缀*/
function getSuffix(file){
    return (-1 !== file.indexOf('.')) ? file.replace(/.*[.]/, '') : '';
}
/**
*删除数组指定对象 var a=new Array(); a.remove(obj)
*/
Array.prototype.remove=function(obj){
	for(var i =0;i <this.length;i++){
		var temp = this[i];
		//console.log(temp,obj,temp==obj)
		if(temp == obj){
			for(var j = i;j <this.length;j++){
				this[j]=this[j+1];
			}
			this.length = this.length-1;
			return i;
		}
	}
} 
/* 数组是否包含对象  var a=new Array();a.contains(1)*/
Array.prototype.contains = function (element) {
	 
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
};
/*数字四舍五入  例如 12.515.format(保留小数位数)*/
Number.prototype.format=function(n){
	var _this=this+"";
	var pointindex=_this.indexOf('.');
	if(pointindex<=0){
		return parseFloat(_this);
	}
	var intnum=_this.substring(0,pointindex);
	var floatnum=_this.substring(pointindex+1);
	floatnum=Math.round(parseInt(floatnum)/Math.pow(10,(floatnum.length-n)));
	var num=parseFloat(intnum+"."+floatnum);
	
	if(floatnum.toString().length>=(n+1)){
		num=parseFloat((parseInt(intnum)+1)+"."+(floatnum-Math.pow(10,n)));
	}
	return num;
}; 

//回车搜索
function keyDownSearch(e) {  
    // 兼容FF和IE和Opera  
    var theEvent = e || window.event;  
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;  
    if (code == 13) {   
        //DoSomeThing();//具体处理函数  
        return false;  
    }  
    return true;  
} 

$(function(){
	 //input复选按钮
   /* $('.form-checkbox input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        increaseArea: '20%'
    });*/
  //input单选按钮
   /* $('.form-radio').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
    });*/
  //按钮提示
    $('.look','.edit','.delete','.add','.download','.forbid','.forbid2','pwd').attr('data-toggle','tooltip');
    $('.look').attr('title','点击查看');
    $('.pwd').attr('title','点击修改密码');
    $('.edit').attr('title','点击编辑');
    $('.delete').attr('title','点击删除');
    $('.add').attr('title','点击添加');
    $('.download').attr('title','点击下载');
    $('.forbid').attr('title','点击禁用');
    $('.forbid2').attr('title','点击解除禁用');
    //点击模态框以外不消失
    $('.modal').modal({
  	  backdrop: 'static',
  		  show:false
  	});
    
    
    
});
/*数字转中文*/
var cnNumbers=['零','一','二','三','四','五','六','七','八','九'];
var series=["","十","百","千","万","十万","百万","千万","亿"]; 
function toCnNumber(num){
	num=num+'';
	var str="";
	var flag=false
	for(var i=0;i<num.length;i++){
		var n=parseInt(num[i]);
		if(n==0){
			if(!flag){
				str+=cnNumbers[n];
			}
			flag=true;
		}else{
			str+=cnNumbers[n];
			str+=series[(num.length-i-1)];
			flag=false;
		}
	}
	var o=str.lastIndexOf('零');
	if(str!='零'&&o==(str.length-1)){
		str=str.substr(0,o);
	}
	if(str.indexOf('一十')==0){
		str=str.substr(1);
	}
	return str;
}
/*树形下拉属性配置*/
var setting = {
    view: {
        selectedMulti: false,
		 showIcon: false,
		 showLine:false
    },
    check: {
        enable: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    edit: {
		showRenameBtn:false,
		showRemoveBtn :false,
       enable: true,
		drag:{
			isMove:false,
			isCopy:false
		}
	}
};
(function($) {
	var selectbox=$.fn.selectbox=function(options){
		var _this=this ;
		var id=$(_this).attr('id');
		
		var opts = $.extend({}, $.fn.selectbox.defaults, options);
		$(_this).addClass("selectbox");
		_this.opts=opts;
		$(_this).val('');
		return this.each(function(){
			if(!$(opts.showobj).find('table').hasClass('table-hover')){
				//hhDrop选择下拉框
				$(opts.hhdrop).hhDrop({notclick:true});
				$(_this).bind('propertychange input focus',function(){
					dosearchuser(1,_this);
					/*if(!$(opts.showobj).is(':visible')){
						$(opts.hhdrop).find('.glyphicon-chevron-down').click();
					}*/
				});
				
				$(document).on('click',opts.showobj+" tr:gt(0)",function(){
					var data=new Array();
					var callbackdata=$(this).attr('callbackdata');
					if($.trim(callbackdata)!=""){
						data=callbackdata.split('^|^');
					}
					window[opts.onclick].apply(this,data);
					dosearchuser(1,_this);
					$(opts.hhdrop).find('.glyphicon-chevron-down').click();
				})
				$(document).on('click',opts.showobj+" .page a",function(){
					var page=$(this).attr('page');
					if(page>0){
						dosearchuser(page,_this);
					}
				})
			}
			dosearchuser(1,_this);
		})
		return _this;
	}
	$.fn.selectbox.defaults={
		hhdrop:'#hhdroptearch',
		showobj:'#searchtable',
		currentname:'name',
		otherparam:['#otherdtsid'],
		paramname:['tsid'],
		onclick:'changeuser',
		url:'/newemployee/user.do?cmd=searchlist'
	}
	//解决ie下readonly删除回退时间
	$("input[readOnly]").keydown(function(e) {
        e.preventDefault();
});
})(jQuery); 
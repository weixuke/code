Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}

//网页地址,如：http://www.baidu.com
var url = "";
//图片保存地址,如：D:\work_note\htmlToImg\demo_phantomjs\html_.png
var savePath = "";
//日志输出地址,如：
var logPath = "";
//浏览器宽度
var viewWidth = 0;
//浏览器高度
var viewHeight = 0;
//printscreen需要截图的区域开始位置
var ps_top = 0;
//左边距位置
var ps_left = 0;
//宽度
var ps_width = 0;
//高度
var ps_height = 0;
//页面渲染时长,单位毫秒
var waitTime = 0;

//phantom输出字符集格式
phantom.outputEncoding="utf-8";
//时间格式化
var dateFormat = "yyyy-MM-dd hh:mm:ss";
//获得系统操作对象
var system = require('system');
var fs = require('fs');

//{'url':'http://www.baidu.com','savePath':'D:\\temp\\baidu.png','logPath':'d:\\temp\\js_log.log','viewWidth':'2479','viewHeight':'3508','ps_top':'0','ps_left':'0','ps_width':'2479','ps_height':'3508','waitTime':'5000'}
//获得参数对象
var json = system.args[1];
json = eval('(' + json + ')');

	url = json.url;
	savePath = json.savePath;
	logPath = json.logPath;
	viewWidth = json.viewWidth;
    viewHeight = json.viewHeight;
    ps_top = json.ps_top;
    ps_left = json.ps_left;
    ps_width = json.ps_width;
    ps_height = json.ps_height;
	waitTime = json.waitTime;
	
	//console.log("url = "+url);
	//console.log("savePath = "+savePath);
	//console.log("logPath = "+logPath);
	//console.log("viewWidth = "+viewWidth);
	//console.log("viewHeight = "+viewHeight);
	//console.log("ps_top = "+ps_top);
	//console.log("ps_left = "+ps_left);
	//console.log("ps_width = "+ps_width);
	//console.log("ps_height = "+ps_height);
	//console.log("waitTime = "+waitTime);

if(checkParamer(json.url)&&
   checkParamer(json.savePath)&&
   checkParamer(json.logPath)&&
   checkParamer(json.viewWidth)&&
   checkParamer(json.viewHeight)&&
   checkParamer(json.ps_top)&&
   checkParamer(json.ps_left)&&
   checkParamer(json.ps_width)&&
   checkParamer(json.ps_height)&&
   checkParamer(json.waitTime)
   ){
	url = json.url;
	savePath = json.savePath;
	logPath = json.logPath;
	viewWidth = json.viewWidth;
    viewHeight = json.viewHeight;
    ps_top = json.ps_top;
    ps_left = json.ps_left;
    ps_width = json.ps_width;
    ps_height = json.ps_height;
	waitTime = json.waitTime;
	
	log("url = "+url);
	log("savePath = "+savePath);
	log("logPath = "+logPath);
	log("viewWidth = "+viewWidth);
	log("viewHeight = "+viewHeight);
	log("ps_top = "+ps_top);
	log("ps_left = "+ps_left);
	log("ps_width = "+ps_width);
	log("ps_height = "+ps_height);
	log("waitTime = "+waitTime);
	
	printScreen(url);
}else{
	console.log("param undefined");
}

function printScreen(url){
	var page = require('webpage').create();
	page.open(url, function (status) {
		if (status !== 'success') {
			console.log('Unable to load this '+url+' url!');
			phantom.exit(1);
		} else {
			window.setTimeout(function () {
				// 通过在页面上执行脚本获取页面的渲染高度
				var bb = page.evaluate(function () { 
					return document.getElementsByTagName('html')[0].getBoundingClientRect(); 
				});
				page.viewportSize = { width: viewWidth, height: viewHeight};
				page.zoomFactor = viewWidth/bb.width;
				/**/
				console.log("html top="+bb.top+" left="+bb.left+" width="+bb.width+" heigth="+bb.height +
					" realWidth="+bb.scrollWidth+//页面真是宽度
					""+bb.scrollHeidth);//页面真是高度
				/*{ width: size[0], height: size[1], margin: '0px' }*/
				page.paperSize = { 
									width: img_width, height: img_height, margin: '0px'
								};
				// 通过clipRect可以指定渲染的区域：
				page.clipRect = { top: ps_top, left: ps_left, width: ps_width, height: ps_height };
				page.render(output);
				console.log('success!');
				phantom.exit();
			}, waitTime);
		}
	});
}


phantom.exit();

function log(content){
	try{
		fs.write(logPath, (new Date().format(dateFormat))+" ["+content+"]\r\n", 'a');
	} catch(e){
		console.log(e);
	}
}

function checkParamer(arg){
	if(arg){
		return true;
	}else{
		return false;
	}
}


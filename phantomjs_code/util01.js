Date.prototype.format = function(fmt) { 
    var o = { 
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        "S"  : this.getMilliseconds()
    }; 
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt; 
};

var system = require("system");
var pid = system.pid;
console.log(pid);    //本次进程pid
var fs = require('fs');

//网页地址,如：http://www.baidu.com
var url = "";
//图片保存地址,如：D:\work_note\htmlToImg\demo_phantomjs
var imgSavePath = "";
//日志输出地址,如：
var logPath = "/service/server/phantomjs-dir/log/pjs_init.log";
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
//时间格式化
var dateFormat = "yyyy-MM-dd hh:mm:ss";

var SERVER_INIT_SUCCESS = "SERVER_INIT_SUCCESS";
var SERVER_INIT_ERROR = "SERVER_INIT_ERROR";
var SERVER_INIT_PARAMS_ERROR = "SERVER_INIT_PARAMS_ERROR";
var HTML_TO_IMG_SUCCESS = "HTML_TO_IMG_SUCCESS";
var HTML_TO_IMG_FAIL = "HTML_TO_IMG_FAIL";
//phantom输出字符集格式
phantom.outputEncoding="utf-8";

//获得参数对象
var json_str = system.args[1];

if(!checkParamer(json_str)){
	log("params is null!");
	console.log(SERVER_INIT_PARAMS_ERROR+" json_str="+json_str);
	phantom.exit();
}

var json = eval('(' + json_str + ')');
//json = json_str.parseJSON();

var page;


//监听std输入
var listen = function(type) {
	if("init"==type){
		page.open("http://www.baidu.com", function (status) {
    	        if (status !== 'success') {
					console.log(SERVER_INIT_ERROR);
					log("------"+pid+" init fail ------");
					phantom.exit();
                } else {
                    window.setTimeout(function () {
						page.paperSize = {width: viewWidth, height: 600, margin: '0px'};
                        page.clipRect = { top: 0, left: 0, width: ps_width, height: ps_height };
						page.render("test_baidu_"+pid+".png");
						console.log(SERVER_INIT_SUCCESS);
						fs.remove("test_baidu_"+pid+".png");
						log("------"+pid+" init success ------");
						listen("next");
                    }, 500);
                }
		    });
	}else{
		log(" listening... ");
	    var args = system.stdin.readLine();    //接收std内容为url
	    log(" listen data "+ args);
	
	    if(checkParamer(args)){
	    	if("over"==args){
	    		log("Process over.");
	    		phantom.exit();
	    	}
	    	var arg = eval('(' + args + ')');
	    	//"{'imgSavePath':'test.png','url':'http://www.baidu.com'}"		
	    	if(checkParamer(arg)&&
	    	   checkParamer(arg.url)&&
	    	   checkParamer(arg.imgName)&&
	    	   checkParamer(arg.key)
	    	){
				var p_viewWidth = 0;
				var p_viewHeight = 0;
				
				if(0!=arg.ps_width){
					p_viewWidth = arg.ps_width;
				}else{
					p_viewWidth = viewWidth;
				}
				
				if(0!=arg.ps_height){
					p_viewHeight = arg.ps_height;
				}else{
					p_viewHeight = viewHeight
				}
				
				var p_viewWidth
				
	    		var url = arg.url;
	    	    var imgName = arg.imgName;
	    		var key = arg.key;
	    		log("key = " + key + " start");
	    	    page.open(url, function (status) {
        	        if (status !== 'success') {
	    				log(" open page fail,url = " + url);
	    				system.stdout.writeLine(HTML_TO_IMG_FAIL+","+key); 
	    				system.stdout.flush();
	    				listen("next");
                    } else {
	    	        	log(" open page success ");
                        window.setTimeout(function () {
	    					//page.paperSize = {width: viewWidth, height: viewHeight, margin: '0px'};
                            page.clipRect = { top: 0, left: 0, width: p_viewWidth, height: p_viewHeight };
	    					page.render(imgSavePath+imgName);
	    					system.stdout.writeLine(HTML_TO_IMG_SUCCESS+","+key); 
	    					system.stdout.flush();
	    	        		log(" render success ");
	    					log("key = " + key + " end");
	    					listen("next");
                        }, waitTime);
                    }
	    	    });
	    	} else {
	    		system.stdout.writeLine(HTML_TO_IMG_FAIL); 
	    		system.stdout.flush();
	    		log("html params is error! args = "+args);
	    		listen("next");
	    	}
	    } else {
	    	system.stdout.writeLine(HTML_TO_IMG_FAIL);
	    	system.stdout.flush();
	    	log("html params is error! args = "+args);
	    	listen("next");
	    }
	}
};

function log(content){
	try{
		fs.write(logPath, (new Date().format(dateFormat)) + " [" + content + "]\r\n", 'a');
	} catch(e){
		console.log(e);
	}
}

function checkParamer(arg){
	log("check "+arg);
	if(undefined!=arg&&""!=arg){
		log(arg+"true");
		return true;
	}else{
		if(0==arg){
			return true;
		}
		return false;
	}
}
log(json);
log(checkParamer(json.logPath));
log(checkParamer(json.imgSavePath));
log(checkParamer(json.viewWidth));
log(checkParamer(json.viewHeight));
log(checkParamer(json.ps_top));
log(checkParamer(json.ps_left));
log(checkParamer(json.ps_width));
log(checkParamer(json.ps_height));
log(checkParamer(json.waitTime));




//"{'logPath':'test','viewWidth':'800','viewHeight':'600','ps_top':0,'ps_left':0,'ps_width':800,'ps_height':600,'waitTime':1000}"
if(checkParamer(json.logPath)&&
   checkParamer(json.imgSavePath)&&
   checkParamer(json.viewWidth)&&
   checkParamer(json.viewHeight)&&
   checkParamer(json.ps_top)&&
   checkParamer(json.ps_left)&&
   checkParamer(json.ps_width)&&
   checkParamer(json.ps_height)&&
   checkParamer(json.waitTime)
   ){
    logPath = json.logPath;
	imgSavePath = json.imgSavePath;
    viewWidth = json.viewWidth;
    viewHeight = json.viewHeight;
    ps_top = json.ps_top;
    ps_left = json.ps_left;
    ps_width = json.ps_width;
    ps_height = json.ps_height;
    waitTime = json.waitTime;
	
    log("-------- phantom "+pid+" server init --------");
    log("logPath = "+logPath);
	log("imgSavePath = "+imgSavePath);
    log("viewWidth = "+viewWidth);
    log("viewHeight = "+viewHeight);
    log("ps_top = "+ps_top);
    log("ps_left = "+ps_left);
    log("ps_width = "+ps_width);
    log("ps_height = "+ps_height);
    log("waitTime = "+waitTime);
	
	page = require('webpage').create({
            	viewportSize : { width: viewWidth, height: viewHeight}
            });
	listen("init");
}else{
	console.log(SERVER_INIT_PARAMS_ERROR);
	log("--- phantom "+pid+" init params is error!---");
	phantom.exit();
}




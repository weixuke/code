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
};
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
//时间格式化
var dateFormat = "yyyy-MM-dd hh:mm:ss";
//获得系统操作对象
var system = require('system');
var fs = require('fs');
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
	
//获得参数对象
var json = system.args[1];
json = eval('(' + json + ')');

var img_width = 2479;
var img_height = 3508;
var page = require('webpage').create({
	viewportSize : { width: img_width, height: img_height},
	zoomFactor : img_width/375
});

phantom.outputEncoding="utf-8";

//网页地址
var url_address = "https://test-static.bestjlb.com/application?tid=42&type=18&orgId=1000000019&activeCode=APP_GrabRedPacket&access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDEwNDA1IiwiaXNvbGF0aW9uIjoiYmVzdGpsYiIsImV4cCI6MTUxNzI4MDQyMSwidHlwZSI6IkFORFJPSUQiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNTdjZDc5YjEtNGY3Yi00ZDAyLWFlMTItNGY5YTFiOTE0NjM3In0.NPSz3DWqE9-Av4u20Bkn4KAS-uCCFM0bB3TEG4zRbemL76d3JDUVX4ebCMX1pwAxNU9p3-RqEMSNE8cyJ9Ei6Q";
url_address = "https://test-static.bestjlb.com/application?tid=44&type=20&orgId=1000000019&activeCode=APP_PIC_HanJiaTeHui&access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDEwNDA1IiwiaXNvbGF0aW9uIjoiYmVzdGpsYiIsImV4cCI6MTUxNzM4NDI5NCwidHlwZSI6IkFORFJPSUQiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiZjljMzQzNzUtNjUzYy00YWQwLTg4MDItMGVmM2NjNDc4MTY5In0.p3TjFC15YUrhgZ3LZHtLp8c9BH8ZzCNcAegg49YxPtTH6NKcZcZhVdx-W2ryodMcYjNPbdjldkzg_Wdy1gfraQ";
//img文件输入位置
var output = "img_gao_qing_zhaosheng.png";


page.open(url_address, function (status) {

	if (status !== 'success') {
        console.log('Unable to load this '+url_address+' url!');
        phantom.exit(1);
    } else {
        window.setTimeout(function () {
			// 通过在页面上执行脚本获取页面的渲染高度
			var bb = page.evaluate(function () { 
			//
			document.getElementsByClassName('m-canvas')[0]
				return document.getElementsByTagName('html')[0].getBoundingClientRect(); 
			});
			/**/
			console.log("html top="+bb.top+" left="+bb.left+" width="+bb.width+" heigth="+bb.height +
			     " realWidth="+bb.scrollWidth+//页面真是宽度
				 ""+bb.scrollHeidth);//页面真是高度
			/*{ width: size[0], height: size[1], margin: '0px' }*/
			page.paperSize = { 
								width: img_width, height: img_height, margin: '0px'
							 };
			// 通过clipRect可以指定渲染的区域：
            page.clipRect = { top: 0, left: 0, width: img_width, height: img_height };
            page.render(output);
			console.log('success!');
            phantom.exit();
        }, 2*1000);
    }
});


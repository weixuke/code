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
url_address = "http://192.168.1.180:8888/application?tid=2&type=4&access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDAwMDY2IiwiaXNvbGF0aW9uIjoiYmVzdGpsYiIsImV4cCI6MTUxNzkwOTUwNSwidHlwZSI6IkdFTkVSQUwiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNDcyMDUxMWQtMTJjMC00YThjLTk2YWEtYTY2M2QxMjUyNDVmIn0.HYNPMzWYZsw6k1ickLyYnNBLfHvQm8b5tcp1hUAycWoIDKh8mbN5jsC_B01ltyU38K_utyI147dYwNq7IWPO1Vt6ZoAtdvGmoi2IyImECufesAfCeUafMXewiECKS1Pg0eEzAG1SbNlsqlWXAhSsSeKoh9XxD7GAg07RqDpY0i_-1OyCe3fUnYdyoqqvk59t7qEqYVJggzHKD56Ufpp4Cds18q_0btBEvcP1DuL5eeoE5ndb4EIMDkQIGweD3O6AU7TA_EcLN_ld0IEjwFgN6qNKZ5lVkbYfwwBjZ_Qg5RgfstLZ4bx1umazFrZFFRMHhWsbh7XtOODz7SnL38NUng";
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
        }, 5*1000);
    }
});


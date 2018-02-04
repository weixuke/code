
var viewWidth = 800;
var viewHeight = 600;
var url = "http://www.baidu.com";
var savePath = "test.png";
var waitTime = 1000;
var HTML_TO_IMG_FAIL = "123";
var HTML_TO_IMG_SUCCESS = "456";



var page = require('webpage').create({
         	viewportSize : { width: viewWidth, height: viewHeight}
         });

page.open(url, function (status) {
    if (status !== 'success') {
	
    } else {
        window.setTimeout(function () {
			page.paperSize = {width: viewWidth, height: viewHeight, margin: '0px'};
            page.clipRect = { top: 0, left: 0, width: viewWidth, height: viewHeight };
            page.render(savePath);
			phantom.exit();
        }, waitTime);
    }
});

var webPage = require('webpage');
var page = webPage.create({
            	viewportSize : { width: 1875, height: 3015}
            });
var url = "https://test-static.bestjlb.com/application?type=4&shareCode=2b4bb84879bf4695b308ce6106b01d04";
//url = "http://baidu.com";
page.open(url, function (status) {
        	        if (status !== 'success') {
	    				console.log(" open page fail,url = " + url);
						phantom.exit();
                    } else {
	    	        	console.log(" open page success ");
                        window.setTimeout(function () {
	    					page.paperSize = {width: 1875, height: 3015, margin: '0px'};
                            page.clipRect = { top: 0, left: 0, width: 1875, height: 3015 };
							page.render("test0001.png");
	    	        		console.log(" render success ");
							phantom.exit();
                        }, 500);
                    }
	    	    });


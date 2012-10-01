var system = require('system');
var fs = require('fs');

contents = "<html><head></head><body onload='console.log(+new Date())'></body></html>";

var page = new WebPage();
page.onConsoleMessage = function (msg) {
    console.log(msg);
}

function doFinish(status) {
    console.log(+new Date());
    phantom.exit();
}

page.onLoadFinished = doFinish;
page.content = contents;

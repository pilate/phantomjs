var system = require('system');
var url;

if (system.args[1]) {
    url = system.args[1];
}
else {
    url = "http://localhost.pilate.es/test.html";
}

var page = new WebPage();
page.settings.userAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; FunWebProducts; .NET CLR 1.1.4322; PeoplePal 6.2)";

/*page.onConsoleMessage = function (msg) { console.log(msg); };*/

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    })
}

page.open(url, function (status) {
    var txt_dom = page.content;
    var b64_dom = btoa(txt_dom);
    console.log([+new Date()+"000", "finish",b64_dom].join("|"));
    phantom.exit();
});

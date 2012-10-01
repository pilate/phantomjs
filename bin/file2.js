var system = require('system');
var contents;

if (system.args[1]) {
    contents = system.args[1];
}
else {
    contents = "<html><head></head><body></body></html>";
}

var page = new WebPage();

page.settings.userAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; InfoPath.2; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C; .NET4.0E)";
//page.settings.userAgent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en; rv:1.9.1.1) Gecko/20090715 Firefox/3.5";
page.settings.localToRemotecontentsAccessEnabled = true;

page.onError = function (msg, trace) {
    logEvent("error", trace, trace);
};

function logEvent(event, contents, data) { 
    // btoa won't encode certain characters
    var e_contents = escape(contents);
    var e_data = escape(data);

    console.log([+new Date()+"000", event, btoa(e_contents), btoa(e_data)].join("|"));
}

function doFinish(status) {
    // Write 'finish' event.

    console.log("Two:", page.content.indexOf('&amp;'));
    if (!status) {
        logEvent("finishForced", contents, page.content);
    }
    else {
        logEvent("finish", contents, page.content);
    }

    phantom.exit();
}

setTimeout(doFinish, 10000);
page.onLoadFinished = doFinish;
//console.log("Content:",.indexOf('&amp;'));
//page.content = 
page.evaluate(function (content) {document.write(content);}, unescape(atob(contents)));


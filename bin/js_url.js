var system = require('system');

var resources = 0;
var last_js = false;
var scripted = false;

if (system.args[1]) {
    var url = system.args[1];
}
else {
    console.log("URL Parameter Required.");
}

var page = new WebPage();

page.settings.userAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; InfoPath.2; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C; .NET4.0E)";
//page.settings.userAgent = "Mozilla/5.0 (Linux; U; Android 4.0.3; en-gb; HTC Sensation XE with Beats Audio Z715e Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
page.settings.localToRemoteUrlAccessEnabled = true;

page.onError = function (msg, trace) {
    logEvent("error", url, msg);
};

// Keep track of resource loads for JS only pages
page.onResourceReceived = function (req) {
    if (req.stage === "end") {
        resources++;
        if ("contentType" in req && typeof(req.contentType) === "string") {
            if (req.contentType.indexOf("javascript") !== -1) {
                last_js = true;
            }
            else {
                last_js = false;
            }
        }
    }
}

function logEvent(event, url, data) { 
    // btoa won't encode certain characters
    var e_url = escape(url);
    var e_data = escape(data);

    console.log([+new Date()+"000", event, btoa(e_url), btoa(e_data)].join("|"));
}

function doFinish(status) {
    // Insert script tags around javascript-only content
    if (resources == 1 && last_js && !scripted) {
        page.content = "<script class='phantomTag'>"+ page.plainText +"</script>";
        scripted = true;
        return;
    }

    // Write 'finish' event.
    if (!status) {
        logEvent("finishForced", url, page.content);
    }
    else {
        logEvent("finish", url, page.content);
    }

    phantom.exit();
}

setTimeout(doFinish, 10000);
page.open(url, doFinish);

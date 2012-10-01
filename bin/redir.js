var url = "http://fiddle.jshell.net/Pilate/wqE2q/show/light/";
var page = new WebPage();

page.settings.localToRemoteUrlAccessEnabled = true;

function urlChange (url) {
    console.log("Changed to:",url);
}

page.onUrlChanged = urlChange;

page.onError = function (msg, trace) {
    console.log(msg);
}

page.open(url, function (status) {
    console.log(page.pages);
    phantom.exit();
});

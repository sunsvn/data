var music = true, // 是否有背景音乐
    musicBtn = true, // 音乐按钮
    musicPlay = true, // 音乐播放中
    preload = null; // 预载对象

$(function(){
    // 预载资源
    var res = [
		/*
		'images/loading.png',
        'images/music.png'
		*/
    ];
    preloadRes(res);

    // Swiper
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical'/*,
        onInit: function(swiper){       // 使用Swiper Animate
            swiperAnimateCache(swiper); // 隐藏动画元素
            swiperAnimate(swiper); // 初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); // 每个slide切换结束时也运行当前slide动画
        }*/
    })
});

// 预载资源
function preloadRes(res) {
    var manifest = res;
    preload = new createjs.LoadQueue(false);
    preload.on("complete", preloadComplete);
    preload.on("progress", preloadProgress);
    preload.setMaxConnections(5);
    preload.loadManifest(manifest);
}

function preloadComplete(event) {
    preload.off("complete", preloadComplete);
    preload.off("progress", preloadProgress);
    $('.pageLoading').remove();
	// 资源加载完成后
    initPage();
}

function preloadProgress(event) {
    var progressInt = parseInt(preload.progress * 100);
    $('.jsProgress').text(progressInt);
}


// 初始化页面内容
function initPage() {
    
}

// 音乐控制
function initBgMusic() {
    if(music) {
		setTimeout(function(){
			$(window).scrollTop(1);
		},0);
		document.getElementById('bgMusic').play();
		document.addEventListener('WeixinJSBridgeReady', function () {
			WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
				document.getElementById('bgMusic').play();
			});
		}, false);

        $('.audio-bg').show();
        if(musicBtn) {
            $('.audio-btn').click(function(){
                if(musicPlay) {
                    musicPlay = false;
                    $('#bgMusic')[0].pause();
                    $('.audio-open').hide();
                    $('.audio-close').show();
                }else {
                    musicPlay = true;
                    $('#bgMusic')[0].play();
                    $('.audio-open').show();
                    $('.audio-close').hide();
                }
            })
        }
    }else {
        $('#bgMusic')[0].pause();
        $('.audio-bg').hide();
    }
}


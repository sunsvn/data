function wxshare(wxShareHandleUrl, currentUrl, shareData){
	$.ajax({
		type: "GET",
		url: wxShareHandleUrl + "?url=" + currentUrl,
		dataType: 'jsonp',
		jsonp: "callback",
		jsonpCallback:"success_jsonpCallback",
		success : function(data){
			// console.log(data);
			wx.config({
				debug: false,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: [
					"onMenuShareTimeline",
					"onMenuShareAppMessage",
					'onMenuShareQQ'
				]
			});
		},
		error:function(errorInfo){
			console.log(errorInfo);
		}
	});

	console.log(wx);

	wx.ready(function(){
		// wx.hideOptionMenu();
		wx.onMenuShareTimeline({
			title: shareData.title,
			link: shareData.link,
			imgUrl: shareData.imgUrl,
			success: function () {
				// alert('分享成功');
			},
			cancel: function () {
				// alert('分享失败');
			}
		});

		wx.onMenuShareAppMessage({
		    title: shareData.title,
		    desc: shareData.desc,
		    link: shareData.link,
		    imgUrl: shareData.imgUrl, 
		    type: 'link',
		    dataUrl: '', 
		    success: function () { 
		        // alert('分享成功');
		    },
		    cancel: function () { 
		        // alert('分享失败');
		    }
		});

		wx.onMenuShareQQ({
		    title: shareData.title,  
		    desc: shareData.desc,  
		    link: shareData.link,  
		    imgUrl: shareData.imgUrl,  
		    success: function () { 
		       // alert('分享成功');
		    },
		    cancel: function () { 
		       // alert('分享失败');
		    }
		});
	});
}
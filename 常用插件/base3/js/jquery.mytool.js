/* 仅用于手机端(webkit浏览器) */

/**
 * 弹出信息框
 *
 * texts:内容
 * time:弹出框显示的时间（可选参数）
 * top:弹出框的高度（可选参数）
 */
function msgbox(a,b,c){$(document.body).append('<div class="msgbox"><span>'+a+"</span></div>");$(".msgbox").css({position:"fixed",left:0,top:"40%",height:"10%",width:"100%",textAlign:"center",color:"white",zIndex:"99999999"}).find("span").css({backgroundColor:"rgba(0,0,0,0.8)",padding:"2.5% 8%",borderRadius:"6px",fontFamily:"\u5fae\u8f6f\u96c5\u9ed1",fontSize:"24px"});c&&$(".msgbox").css({top:c});a=$(".msgbox").css("height");$(".msgbox").css("line-height",a).hide().fadeIn("200");b?setTimeout(function(){$(".msgbox").fadeOut("200",function(){$(this).remove()})},b):setTimeout(function(){$(".msgbox").fadeOut("200",function(){$(this).remove()})},2E3)};


/**
 * 获取URL的参数
 *
 * name:相对应参数的name
 */
function getUrlParam(a){a=new RegExp("(^|&)"+a+"=([^&]*)(&|$)");a=window.location.search.substr(1).match(a);return null!=a?decodeURI(a[2]):null};


/**
 * 输出viewport信息
 */
function getViewport(){var a=parseInt(window.screen.width)/640;/Android (\d+\.\d+)/.test(navigator.userAgent)?2.3<parseFloat(RegExp.$1)?document.write('<meta name="viewport" content="width=640, minimum-scale = '+a+", maximum-scale = "+a+', target-densitydpi=device-dpi">'):document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">'):document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">')};

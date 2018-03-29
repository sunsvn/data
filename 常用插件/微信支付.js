<script>
if( result == 'OUT_TRADE_NO_USED' ){
    window.location.href = APPURL + '/wxpay/index?userid='+personId+'&&token='+token+'&&order_id='+order_id
}
result = JSON.parse( result );
function onBridgeReady(){
   WeixinJSBridge.invoke(
       'getBrandWCPayRequest', {
           "appId" : result.appId,     //公众号名称，由商户传入     
           "timeStamp": result.timeStamp,         //时间戳，自1970年以来的秒数     
           "nonceStr" : result.nonceStr, //随机串     
           "package" : result.package,     
           "signType" : "MD5",         //微信签名方式：     
           "paySign" : result.paySign //微信签名 
       },
       function(res){     
           if(res.err_msg == "get_brand_wcpay_request：ok" ) {
				localStorage.removeItem('orderId');		           	
           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
       }
   ); 
}
if (typeof WeixinJSBridge == "undefined"){
   if( document.addEventListener ){
       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
   }else if (document.attachEvent){
       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
   }
}else{
   onBridgeReady();
}
</script>
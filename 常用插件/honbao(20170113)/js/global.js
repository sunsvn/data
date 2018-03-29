/**
 * 全局脚本
 */



// 提示
$('body').append(function() {
	return "<center class='tip_wrap'><span class='tip'></span></center>";
});
function message(msg) {
	$('.tip').text(msg);
	$('.tip_wrap').show();
	setTimeout(function() {
		$('.tip_wrap').hide();
	}, 1000);
}

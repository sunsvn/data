angular.module('myApp', ['ngAnimate'])
.directive('myDir',['$animate','$compile',myDir]);
.controller('testCtrl',angular.noop);
function myDir($animate, $compile){
	function link(scope,element,attr){
		var isAppended = false;
		var parent = element.parent();
		var box;
		element.on('click',function(){
			isAppended = !isAppended;
			if(isAppended){
				box = angular.element('<div class="fade"></div>');
				scope.$apply($animate.enter(box, parent, element, function(){
					console.log(111)
				}))
			}
		})
	}
}






// .controller('myController', ['$scope','myService','$location','$anchorScroll',function($scope,myService,$location,$anchorScroll){
//     $scope.gotoBottom = function(){
//     	$location.hash('top1');
//     	$anchorScroll();
//     }
//     $scope.gotoanchor = function(x){
//     	if($location.hash() != ('titbox'+x)){
//     		$location.hash('titbox'+x);	
//     	}else{
//     		anchorScroll();
//     	}
    	
//     	//$anchorScroll();
//     }
// }]);

angular.module('app',[]);

angular.module('app').controller('homeController',function($scope){
	$scope.customer =[{'name':'Ji','country':'Thailand','salary':'10000'},
                         {'name':'Mine','country':'USA','salary':'12345'},
                         {'name':'Pu','country':'Germany','salary':'22222'},
                         {'name':'Pong','country':'Spain','salary':'1112314'}] ;  

})
.controller('nameController',function($scope){
	$scope.name ='Controller Name12345 form name'; 
	$scope.number = 1;   
	$scope.showtext= function(num){
			$scope.number += num;
	};
});
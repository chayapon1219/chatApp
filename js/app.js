(function() {
    'use strict';                                         
    var app = angular.module('application', []);//ชื่อโมดูล, โมดูลที่เกี่ยวข้อง(จะกล่าวถึงในภายหลัง) 
    app.controller('storeController',function($scope){
	$scope.sushis = [
    {
        name: 'Maguro',
        price: 200,
        description: 'Fat Tuna',
        quantity: 0,
        date: "Oct 2, 2010",
        image: 'image/sushi/maguro.jpg'
    },
    {
        name: 'Tamago',
        price: 120,
        description: 'Rice with Egg',
        quantity: 0,
        date: '2014-04-08',
        image: 'image/sushi/tamago.jpg'
    },
    {
        name: 'Ebi',
        price: 150,
        description: 'Rice with Prawn',
        quantity: 0,
        date: 1288323623006,
        image: 'image/sushi/ebi.jpg'
    },
    {
        name: 'Tako',
        price: 180,
        description: 'Rice with Squid',
        quantity: 0,
        date: 1288323623006,
        image: 'image/sushi/tako.jpg'
    }
    ];
    $scope.purchase = function (item){
    	if(item.quantity > 0){
    		return true;
    	}else{
    		return false;
    	}
    };
    $scope.clickAdd = function (item){
    	item.quantity += 1;
    };
    $scope.clickRemove = function (item){
    	if(item.quantity > 0 ){
    		item.quantity -= 1;
    		return true;
    	}else{
    		return false;
    	}
    };


    });
})(); 
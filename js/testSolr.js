
var myApp  =  angular.module('myApp', []);

myApp.controller('jsonCtrl', function($scope, $http){
    $http.get('http://jsonplaceholder.typicode.com/photos/').success(function (data){
        $scope.employees = data;
    });
    $scope.empName = '';

    $scope.addEmp = function(){
        $scope.employees.push({ name:$scope.empName, city:'bangkok', state:'123' });
    }
    
    $scope.getTotalEmployees    =   function(){
        return $scope.employees.length;    
    }
        
    $scope.reversedMessage  =   function(){
        return $scope.empName.split("").reverse().join("");
    }
    
});


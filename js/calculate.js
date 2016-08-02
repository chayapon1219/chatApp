angular.module('myApp',[]);
angular.module('myApp').controller('calculatorController',function($scope){
    $scope.numString = '';
    $scope.numShow = '';
    $scope.numLeft = 0;
    $scope.numRight = 0;
    $scope.operator = '';
    $scope.addNumber = function(n){
        $scope.numString += n;
        $scope.numShow += n;
    };
    $scope.addOperator = function(n){
        if ($scope.operator == ''){
        $scope.numShow += n;
        $scope.numLeft = parseFloat($scope.numString);
        $scope.numString = '';
        $scope.operator = n;
        }else{
             $scope.calculate();
             $scope.numShow += n;
             $scope.numLeft = parseFloat($scope.numShow);
             $scope.numString = '';
             $scope.operator = n;
             }
    };
    $scope.calculate = function(){
       $scope.numRight = parseFloat($scope.numString);

       switch($scope.operator){
          case '+' : {
            $scope.numShow = $scope.numLeft + $scope.numRight;
            $scope.numString = $scope.numShow;
            $scope.operator = '';
             return 0;}
          case '-' : {
            $scope.numShow = $scope.numLeft - $scope.numRight;
            $scope.numString = $scope.numShow;
            $scope.operator = '';
             return 0;}
          case '*' : {
            $scope.numShow = $scope.numLeft * $scope.numRight;
            $scope.numString = $scope.numShow;
            $scope.operator = '';
             return 0;}
          case '/' : {
            $scope.numShow = $scope.numLeft / $scope.numRight;
            $scope.numString = $scope.numShow;
            $scope.operator = '';
             return 0;}
       }
    };
    $scope.clear = function(){
        $scope.numString = '';
        $scope.numShow = '';
        $scope.numLeft = 0;
        $scope.numRight = 0;
        $scope.operator = '';
    };
    $scope.delete = function(){
        var delString =  $scope.numShow.substring(0, $scope.numShow.length - 1);
        var delChar = $scope.numShow.substring($scope.numShow.length - 1,$scope.numShow.length);
        $scope.numShow =  delString;
        if (delChar == '+' || delChar == '-' || delChar == '*' || delChar == '/'){
            $scope.operator = '';
            $scope.numLeft = 0;
            $scope.numString = $scope.numShow;
        }else{
            $scope.numString = $scope.numString.substring(0, $scope.numString.length - 1);
             }            
                
    };
});
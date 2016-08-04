
var myApp  =  angular.module('mdApp', ['ngMaterial']);

myApp.controller('login', function($scope, $http, $mdDialog) {
  $scope.username = '';
  $scope.password = '';

//=============================================

  $scope.loginAlert = function(ev) {

    data = {
          'username' : $scope.username,
          'password' : $scope.password,
    };

    $http({
    method: 'POST',
    url: 'php/login.php',
    data : data,
    headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
        
        $scope.status = response.data;
        if($scope.status == $scope.username) { 
            window.location.href = "chatRoom.php"; 
        } else {
        $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Login status')
          .textContent($scope.status)
          .ok(' Done ')
          .targetEvent(ev)); 
          }

        $http({
              method: 'POST',
              url: 'php/updateStatus.php',
              data : '',
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
              });

        },function errorCallback(response) {
          console.error(response.data);    
          $scope.username = '';  
          $scope.password = '';           
        });
  };

//=============================================

  $scope.showCustom = function(event) {
     $mdDialog.show({
        clickOutsideToClose: true,
        scope: $scope,        
        preserveScope: true,           
        templateUrl: 'Register.tmpl.html',
     });
  };
});



//====================================================================================================

myApp.controller('regis', function($scope, $http, $mdDialog) {
  $scope.status = '';
  $scope.username = '';
  $scope.password = '';
  $scope.name = '';
  $scope.url_image = '';

//=============================================

  $scope.regisAlert = function(ev) {

      data = {
            'username' :  $scope.username,
            'password' : $scope.password,
            'name' : $scope.name,
            'url' : $scope.url_image
      };
 
      $http({
      method: 'POST',
      url: 'php/Register.php',
      data : data,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}

          }).then(function successCallback(response) {
               console.log(response.data);
               $scope.status = response.data;
               $scope.flag;
                  $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('STATUS')
                    .textContent($scope.status)
                    .ok(' Done ')
                    .targetEvent(ev)
                )
          },function errorCallback(response) {
               console.error(response.data);               
          });
  };


//=============================================

  $scope.reset = function(){
      $scope.username = '';
      $scope.password = '';
      $scope.name = '';
      $scope.url_image = '';
  };

//=============================================

  $scope.showCustom = function(event) {
             $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,        
                preserveScope: true,           
                templateUrl: 'Register.tmpl.html',
             });
          };
 
});


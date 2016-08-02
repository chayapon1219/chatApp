
var myApp  =  angular.module('myApp', ['ngMaterial','luegg.directives']);

myApp.controller('jsonCtrl', function($scope, $http, $interval, $mdDialog){

   data = { };
   
   $interval(function(){
      $http({
        method: 'POST',
        url: 'php/getUser.php',
        data : data,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
               //console.log(response.data);
               $scope.chat= response.data;

      },function errorCallback(response) {
               //console.error(response.data);
      });
  },1000);


   $interval(function(){
      $http({
        method: 'POST',
        url: 'php/getUseronline.php',
        data : data,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
               //console.log(response.data);
               $scope.user= response.data;

      },function errorCallback(response) {
               //console.error(response.data); 
      });
  },1000);


    $http({
        method: 'POST',
        url: 'php/myUser.php',
        data : data,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}

    }).then(function successCallback(response) {
             //console.log(response.data);
             $scope.myUser= response.data;
    },function errorCallback(response) {
             //console.error(response.data);
    });


//================================================

   $scope.Message1 = '';
   $scope.logout = function() {
      $http({
          method: 'GET',
          url: 'php/logout.php',
          data : "",
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
         window.location.href = "Login.html";

      },function errorCallback(response) {
      });

   };

//================================================

  message1 ='';
  $scope.addMessage1 = function() {
      data = { 
         'message' : $scope.message1
      };

      $http({
        method: 'POST',
        url: 'php/Message.php',
        data : data,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
        $scope.message1='';

      },function errorCallback(response) {
      });
};

//================================================

  $scope.showCustom = function(event) {
       $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,        
          preserveScope: true,           
          templateUrl: 'update.tmpl.html',
       });
  };
});


//====================================================================================================

myApp.controller('update', function($scope, $http, $mdDialog) {
  
  $scope.status = '';
  $scope.c_username = '';
  $scope.c_password = '';
  $scope.c_name = '';
  $scope.c_url_image = ''


  $http({
      method: 'POST',
      url: 'php/myUser.php',
      data : '',
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
         console.log(response.data);
         $scope.profile = response.data;

         $scope.c_username = $scope.profile[0]['username'];
         $scope.c_password = $scope.profile[0]['password'];
         $scope.c_name = $scope.profile[0]['name'];
         $scope.c_url_image = $scope.profile[0]['image'];

      },function errorCallback(response) {
               console.error(response.data);               
      });

//================================================

  $scope.updateAlert = function(ev) {

      data = {
            'username' :  $scope.c_username,
            'password' : $scope.c_password,
            'name' : $scope.c_name,
            'url' : $scope.c_url_image
      };
 
      $http({
      method: 'POST',
      url: 'php/updateProfile.php',
      data : data,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
               console.log(response.data);
               $scope.profile = response.data;
               $scope.flag;
                  $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('STATUS')
                    .textContent('Profile Changed!')
                    .ok(' Done ')
                    .targetEvent(ev)
                )
      },function errorCallback(response) {
               console.error(response.data);               
      });
  };

//================================================

  $scope.reset = function(){
      $scope.c_username = '';
      $scope.c_password = '';
      $scope.c_name = '';
      $scope.c_url_image = '';
  };

//================================================

  $scope.showCustom = function(event) {
       $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,        
          preserveScope: true,           
          templateUrl: 'update.tmpl.html',
       });
  };
});




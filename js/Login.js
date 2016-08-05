
var myApp  =  angular.module('mdApp', ['ngMaterial']);

myApp.controller('login', function($scope, $http, $mdDialog) {
  $scope.username = '';
  $scope.password = '';

//=============================================

  //Login dialog
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

  //Show dialog with a template
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
  
  //============================================================
  //Choose avatars 
  $scope.avatars = [
    { url: 'img/avatars/0.png' },
    { url: 'img/avatars/1.png' },
    { url: 'img/avatars/2.png'  },
    { url: 'img/avatars/3.png'  },
    { url: 'img/avatars/4.png'  },
    { url: 'img/avatars/5.png'  },
    { url: 'img/avatars/6.png'  },
    { url: 'img/avatars/7.png'  },
    { url: 'img/avatars/8.png'  },
    { url: 'img/avatars/9.png'  },
    { url: 'img/avatars/10.png'  }
  ];

  $scope.indexAvatar = 0;

  $scope.nextAvatar = function(ev) {
    if($scope.indexAvatar < 10)
    $scope.indexAvatar = $scope.indexAvatar + 1;
  }

  $scope.previousAvatar = function(ev) {
    if($scope.indexAvatar > 0)
    $scope.indexAvatar = $scope.indexAvatar - 1;
  }

//=============================================

  //show register dialog
  $scope.regisAlert = function(ev) {
      $scope.url_image = $scope.avatars[$scope.indexAvatar]['url'];
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

  //reset button to empry input boxs
  $scope.reset = function(){
      $scope.username = '';
      $scope.password = '';
      $scope.name = '';
      $scope.url_image = '';
  };

//=============================================

  //Show register dialog with a template
  $scope.showCustom = function(event) {
             $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,        
                preserveScope: true,           
                templateUrl: 'Register.tmpl.html',
             });
          };
 
});


//========================================================================================


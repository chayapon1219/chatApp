var myApp  =  angular.module('myApp', ['ngMaterial','luegg.directives']);

myApp.controller('jsonCtrl', function($scope, $http, $interval, $mdDialog, $mdSidenav, $window, $mdToast){


//=================================================================


    $scope.size = 16;
    $scope.fontSize = "font-size-" + $scope.size;

    $scope.increase = function(){
        //Higher limit
        if($scope.size < 22){
            $scope.size++;
            $scope.fontSize = "font-size-" + $scope.size;
        }
    };

    $scope.decrease = function(){
        //Lower limit
        if($scope.size > 16){
            $scope.size--;
            $scope.fontSize = "font-size-" + $scope.size;
        }
    };
  

  

//================================================================
// Sidenav

  $scope.isOpen = function() { 
    return $mdSidenav('left').isOpen(); 
  };

  $scope.toggle = function() { 
    $mdSidenav('left').toggle() 
  };

  $scope.toggleLeft = function() {
  $mdSidenav('left').toggle()
                    .then(function(){
                        $log.debug("toggle left is done");
                    });
  };



//===============================================================

   $scope.lastChatId = 0;
   data = { };
   $scope.chat = new Array();
   
   $interval(function(){
      $http({
        method: 'POST',
        url: 'php/getMessage.php',
        data : $scope.lastChatId,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
               if(response.data != ''){                      
                      $scope.newChat = response.data;
                      $scope.chat = $scope.chat.concat($scope.newChat);
                      $scope.lastChatId = parseInt($scope.newChat[$scope.newChat.length-1]['Message_id']);
                      
                }

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
               $scope.users= response.data;

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
            $mdToast.show($mdToast.simple().textContent('Welcome to chatroom! ..... ' + $scope.myUser[0][3] ));
 
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
         $scope.c_password = '';
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
                    .title('WARNING')
                    .textContent($scope.profile)
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



//===========================================================================================================


 myApp.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet, $http) {
  
  var gridTemplate = 
  '<md-bottom-sheet class="md-grid">\
    <md-list>\
      <md-item ng-repeat="item in items">\
        <md-button class="md-grid-item-content" ng-click="listItemClick($index)">\
            <img ng-src="{{item.icon}}" width="120px" heigth="120px">\
          <p class="md-grid-text"> {{ item.name }} </p>\
        </md-button>\
      </md-item>\
    </md-list>\
   </md-bottom-sheet>';


  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: gridTemplate,
      controller: 'GridBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
    });
  }

  $scope.items = [
      { name: 'Hello', icon: 'img/1.png' },
      { name: 'Sad', icon: 'img/2.png' },
      { name: 'Happy', icon: 'img/3.png' },
      { name: 'Angry', icon: 'img/4.png' },
      { name: 'Bye', icon: 'img/5.png' },
      { name: 'Sorry', icon: 'img/6.png' },
      { name: '...', icon: 'img/7.png' },
  ];

  $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];

      $scope.z ={};
      if($index == '0') $scope.z= 'img/1.png';
      if($index == '1') $scope.z= 'img/2.png';
      if($index == '2') $scope.z= 'img/3.png';
      if($index == '3') $scope.z= 'img/4.png';
      if($index == '4') $scope.z= 'img/5.png';
      if($index == '5') $scope.z= 'img/6.png';
      if($index == '6') $scope.z= 'img/7.png';

      data = { 
         'message' : $scope.z
      };

      $http({
        method: 'POST',
        url: 'php/sendSticker.php',
        data : data,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
        $scope.message1='';

      },function errorCallback(response) {
      });

     $mdBottomSheet.hide(clickedItem);
  };
});

var myApp  =  angular.module('myApp', ['ngMaterial','luegg.directives']);

myApp.controller('jsonCtrl', function($scope, $http, $interval, $mdDialog, $mdSidenav, $window, $mdToast){


//=================================================================
     //Increase and Descrese font size 

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

   //Get all messages
   $scope.lastChatId = 0;
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


   //Get all users and show online point if who online.
   $interval(function(){
      $http({
        method: 'GET',
        url: 'php/getUseronline.php',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
               //console.log(response.data);
               $scope.users= response.data;

      },function errorCallback(response) {
               //console.error(response.data); 
      });
  },1000);


    //Get my profiles
    $http({
        method: 'GET',
        url: 'php/myUser.php',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}

    }).then(function successCallback(response) {
             //console.log(response.data);
            $scope.myUser= response.data;
            $mdToast.show($mdToast.simple().textContent('Welcome to chatroom! ..... ' + $scope.myUser[0][3] ));
 
    },function errorCallback(response) {
             //console.error(response.data);
    });


//================================================

   //Logout
   $scope.logout = function() {
      $http({
          method: 'GET',
          url: 'php/logout.php',
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).then(function successCallback(response) {
         window.location.href = "Login.html";

      },function errorCallback(response) {
      });

   };

//================================================

  //Send Meesages

  $scope.Message1 = '';
  $scope.addMessage1 = function() {
      if($scope.chatCount <= 80){
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
      }
 

//================================================
  $scope.chatCount = 0;
  //Count number of charactor
  $scope.countMessage = function(){
        $scope.chatCount = $scope.message1.length;
        };

//================================================

  //Show dialog to update profiles
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
  $scope.c_url_image = '';

  //Get all data for use to update my profile
  $http({
      method: 'GET',
      url: 'php/myUser.php',
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

//=======================================================

  //Update my profiles
  $scope.updateAlert = function(ev) {
      $scope.c_url_image = $scope.avatars[$scope.indexAvatar]['url'];
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


  //Reset button give a input box null
  $scope.reset = function(){
      $scope.c_username = '';
      $scope.c_password = '';
      $scope.c_name = '';
      $scope.c_url_image = '';
  };

//================================================

  //Show dialog with a template
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
  
  //Show bottom sheet to send stickers
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
        data : data

      }).then(function successCallback(response) {
        $scope.message1='';

      },function errorCallback(response) {
      });

      $mdBottomSheet.hide(clickedItem);
  };
});

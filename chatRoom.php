<!doctype html>
<html ng-app="myApp" >
<head>
    <title>Simple Chat Application</title>

    <script type = "text/javascript" src="js/lib/angular.min.js"></script>  
    <script type="text/javascript" src="js/chatRoom.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css">   
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <script src="https://cdn.rawgit.com/Luegg/angularjs-scroll-glue/master/src/scrollglue.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Mitr" rel="stylesheet">

    <!-- Angular Material Library -->
      <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc2/angular-material.min.js"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css">   
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">  
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,700'>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc2/angular-material.min.css"> 
    <link rel="stylesheet" href="css/chatAppStyle.css">

    <!-- Angular Material requires Angular.js Libraries -->
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-aria.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-messages.min.js"></script>

    <!-- Angular Material Library -->
    <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc2/angular-material.min.js"></script>
</head>

<body layout="column" ng-controller="jsonCtrl" ng-cloak >
    <!-- Tools bar -->
 <md-toolbar class="md-whiteframe-1dp" layout="row" ng-repeat="my in myUser" style="background-color:#0288d1;" flex="6">
     <img ng-src="http://ivansanchez.github.io/leaflet-vs-openlayers-slides/img/AngularJS-Shield-medium.png" 
          width="60px" height="60px" style="margin-left:30px; margin-top:2.5px;" hide-xs>
     <h3 style="margin-left:10px" hide-xs> Angular Material - Starter App</h3>
     <md-button class="md-icon-button md-primary" style="margin-top:12px" show-xs hide-gt-xs>
         <md-icon md-svg-icon="svg/menu2.svg" ng-click="toggleLeft()"></md-icon>
     </md-button>
     <span flex> </span>
     <div style="margin-top:20px; margin-right:5px;" layout="row" hide-xs>
     <md-button class="md-icon-button md-primary" ng-click="increase()">
          <md-icon md-svg-icon="svg/plus2.svg" ></md-icon>
     </md-button>
     <md-button class="md-icon-button md-primary" ng-click="decrease()">
          <md-icon md-svg-icon="svg/minus2.svg"  </md-icon>
     </md-button>
     </div>
     <img style="margin-right:10px; margin-top:15px; border-radius: 50%;" 
          ng-src="{{my.image}}" width="40px" height="40px" >

     <md-menu md-position-mode="target-right target" layout="row" style="margin-right:20px; margin-top:-7px">
         <md-button class="class1" ng-click="$mdOpenMenu($event)">
            <h3><?php session_start(); echo $_SESSION['name']; ?></h3>
         </md-button>
         <md-menu-content width="1" style="background-color: rgba(255, 255, 255, 0.9);">
            <md-menu-item>
                  <md-button ng-click="showCustom($event)">
                      <md-icon md-menu-origin="" md-svg-src="svg/updateProfile.svg"></md-icon>
                      CHANGE PROFILE
                  </md-button>
            </md-menu-item>
            <md-menu-divider></md-menu-divider>
             <md-menu-item>
                  <md-button ng-click="logout()">
                      <md-icon md-menu-origin="" md-svg-src="svg/logout.svg"></md-icon>
                      LOGOUT
                  </md-button>
            </md-menu-item>
          </md-menu-content>
     </md-menu>
 </md-toolbar>


  <div flex layout="row" >   
      <!-- Side nav -->
      <md-sidenav md-is-locked-open="$mdMedia('gt-xs')" md-component-id="left" 
                  class="md-whiteframe-z2" flex="20">
          <md-input-container md-no-float class="md-block" layout-align="stretch">
              <md-icon style="margin-left:5px; " md-svg-src="svg/search.svg"></md-icon>
              <input type="text" ng-model="search.name" placeholder='ENTER NAME'>
          </md-input-container>

          <md-list flex="" style="margin-top:-40px">
              <md-list-item class="md-2-line" ng-repeat="user in users | filter:search" ng-click="null">
                  <img ng-src="{{user.image}}" width="60px" height="60px">
                  <div class="md-list-item-text" layout="column">
                      <p style=" margin-left:10px; font-size: 20px;">{{user.name}} 
                          <img ng-show="{{user.onlineStatus}}" ng-src="http://i.imgur.com/eucAMTA.jpg" width="5px" height="5px" style="border-radius:50%;">
                      </p>
                  </div>
              </md-list-item>
          </md-list> 
      </md-sidenav>
           

      <!-- Chat box -->
      <div layout = "column" flex >
          <md-content flex layout-padding scroll-glue style="background-color:#CBDDF2;" ng-class="fontSize">
               <span height="10px"></span>
               <div ng-repeat="c in chat" layout="column">
                    <div layout="row" ng-if = "c.User_id != '<?php echo $_SESSION['ID']?>'">
                        <img class="img-circle2" ng-src= "{{c.image}}" style="margin-top:-15px; margin-right:20px;">
                        <md-button class="btn1">{{c.Message_text}}
                        <!--div ng-if="c.Message_text.length > 50"> 5555555555555555</div-->
                        <md-tooltip md-direction="right">{{c.Message_time}}</md-tooltip>
                        </md-button>
                       
                    </div>

                    <div layout="row" ng-if = "c.User_id == '<?php echo $_SESSION['ID']?>'">
                        <md-button class="btn2"> {{c.Message_text}} 
                         <md-tooltip md-direction="left">{{c.Message_time}}</md-tooltip>
                         </md-button> 
                        <img class="img-circle2" ng-src= "{{c.image}}" style="margin-top:-15px; margin-left:20px">
                       
                    </div>
               </div>
          </md-content>  
          

      <!-- Button under chat box -->
        <div flex="10">    
             <div layout="row" ng-cloak flex="100" layout-align="end">
                  <div layout="row" layout-align="center center" flex="100" >  
                        <md-button class="md-icon-button md-primary" aria-label="Settings">
                            <md-icon md-svg-icon="svg/emoticon2.svg"></md-icon>
                        </md-button>   
                        <md-input-container md-no-float class="md-block" flex="95" layout-align="stretch">
                            <input type="text" ng-model="message1" style="margin-top: 10px; font-family: 'Mitr', sans-serif;" ng-keydown="$event.which === 13 && addMessage1()" placeholder="Type you Messages!"> 
                        </md-input-container>
                        <md-button class="md-raised md-primary" ng-click="addMessage1()" flex="10"> SEND 
                            <md-icon style="margin-left:5px" md-svg-src="svg/send2.svg"></md-icon>
                        </md-button>
                  </div>
              </div>  
         </div>
      </div>
  </div> 


  <!-- Update proflies template -->
  <script type="text/ng-template" id="update.tmpl.html">
    <md-dialog style=" width:400px; height:500px">
        <form ng-controller="update">
          <md-toolbar>
            <div class="md-toolbar-tools">
                <h2>UPDATE PROFILES</h2>
            </div>
          </md-toolbar>

          <md-dialog-content layout="row" layout-align="center center">
            <div class="md-dialog-content" flex ng-cloak >
                  <center><img class="img-circle" ng-src="{{c_url_image}}"  width="75" height="75"></center>
                  <md-input-container class="md-block">
                      <label>URL Image</label>
                      <input ng-model="c_url_image">
                  </md-input-container>

                  <md-input-container class="md-block" style="margin-top:-17px">
                      <label>Username:</label>
                      <input ng-model="c_username" required>
                  </md-input-container>

                  <md-input-container class="md-block" style="margin-top:-17px">
                      <label>Password:</label>
                      <input ng-model="c_password" type="password">
                  </md-input-container>

                  <md-input-container class="md-block" style="margin-top:-17px">
                      <label>Name:</label>
                      <input ng-model="c_name" required>
                  </md-input-container>
            </div>
          </md-dialog-content>

          <md-dialog-actions layout="row" layout-align="center center" ng-cloak style="margin-top: -40px"> 
              <md-button type="button" class="md-primary md-raised" ng-click="updateAlert($event)">
                  DONE
              </md-button>
              <md-button type="button" class="md-warn md-raised" ng-click="reset()">
                  RESET
              </md-button>
          </md-dialog-actions>
        </form>
    </md-dialog>
  </script>

</body>
</html>

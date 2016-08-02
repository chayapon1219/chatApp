  <script type="text/ng-template" id="Register.tmpl.html">
  <md-dialog style=" width:350px; height: 750px;">
  <form ng-controller="regis">
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>REGISTER</h2>
      </div>
    </md-toolbar>

    <md-dialog-content>
    <md-dialog-content layout="row" layout-align="center center"  >
            <div class="md-dialog-content" flex ng-cloak >

                <center><img class="img-circle" ng-src="{{url_image}}"  width="75" height="75"></center>

                <md-input-container class="md-block">
                    <label>URL Image</label>
                    <input ng-model="url_image">
                </md-input-container>

                <md-input-container class="md-block">
                    <label>Username:</label>
                    <input ng-model="username" required>
                </md-input-container>

                <md-input-container class="md-block">
                    <label>Password:</label>
                    <input ng-model="password" type="password" required>
                </md-input-container>

                <md-input-container class="md-block">
                    <label>Name:</label>
                    <input ng-model="name" required>
                </md-input-container>
            </div>
        </md-dialog-content>
    </md-dialog-content>

        <md-dialog-actions layout="row" layout-align="center center" ng-cloak style="margin-top: -40px"> 
            <md-button type="button" class="md-primary md-raised"  aria-label="Cancel" ng-click="regisAlert($event)">
                DONE
            </md-button>

            <md-button type="button" class="md-warn md-raised"  aria-label="Register" ng-click="reset()">
                RESET
            </md-button>
        </md-dialog-actions>

  </form>
</md-dialog>
</script>
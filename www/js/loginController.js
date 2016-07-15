angular.module('loginController', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state,SMoKEAPIservice,SharedParametersService) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            console.log("Logged in");
            $state.go('tab.opentabs');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

    $scope.loginGo = function(){
        SMoKEAPIservice.getUserDetails($scope.data.password).success(function(response){
            $scope.user = response;
          
          try{
              if($scope.user.firstname == $scope.data.username){
                SharedParametersService.setEmpName($scope.data.username);
                SharedParametersService.setCurrentEmployee($scope.user.employeeid);
                SharedParametersService.setCurrentPW($scope.data.password);   
                $scope.data.username = "";
                $scope.data.password = "";             
                console.log($scope.user.employeeid);
                console.log("user found");
                $state.go('tab.opentabs');
                }else{
                    console.log("no user found");
                var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
                });
                

                }

          }catch(err){
                //alert("PIN not found");
                console.log(err);
                console.log("no user found");
                var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
                });
                
              }
        })
    }
})
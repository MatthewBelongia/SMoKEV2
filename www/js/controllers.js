angular.module('starter.controllers', [])

.controller('InventoryCtrl', function($scope, $stateParams, OpenTabsFactory, $http, SMoKEAPIservice) {
  $scope.inventory = [];
  $http.get('/inventory.json').then(function(response) {
    $scope.inventory = response.data;
  });
  // $scope.id = $stateParams.id;
  //   $scope.items = [];
  //   $scope.item = null;
  //   console.log("test" + $scope.id);
  //   SMoKEAPIservice.getItemDetails($scope.id).success(function (response) {
  //       $scope.item = response.data;
  //       console.log("other test");
  //   });
})


.controller('OpenTabCtrl', function($scope, $location,OpenTabsFactory, $ionicPopup, $http, $ionicModal,ScannedItemService,SMoKEAPIservice,SharedParametersService) {
  
  $scope.nameFilter =null;
  $scope.tabList = [];

  SMoKEAPIservice.getAllTabs().success(function(response){
      $scope.tabList = response;
      console.log(response);
  });

  $scope.updateTabs = function(){
    SMoKEAPIservice.getAllTabs().success(function(response){
      $scope.tabList = response;
      console.log(response);
  });

  }

  window.onload = $scope.updateTabs();

  angular.element(document).ready(function (){
    console.log("testing");

  })

  $scope.$on('$viewContentLoaded', function() {
    console.log("viewContentLoaded");
});

  $scope.$on('$stateChangeSuccess', function () {
    console.log("stateChangeSuccess");
    $scope.updateTabs();
});

  $scope.$on('$routeChangeSuccess', function () {
    console.log("routeChangeSuccess");
});

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.changeTabID = function(tab){

    
    /*
    
    $scope.user.data.employeeid
    $scope.user.data.firstname
    
    $scope.askForPINlite();
    if(!$scope.user.data.firstname.length > 0){
     window.location.href = "#/tab/opentabs/{{tab.id}}";
    */

    

    SharedParametersService.setCurrentTabID(tab.id);
    SharedParametersService.setCurrentEmployee(tab.empId);
    SharedParametersService.setEmpName(tab.name);
    SharedParametersService.setLocation(tab.location);

    console.log(tab);

    console.log("currentID: " + SharedParametersService.getCurrentTabID());
    console.log("currentempid: " + SharedParametersService.getCurrentEmployee());
    console.log("currentempid: " + SharedParametersService.getEmpName());
    console.log("currentLocation: " + SharedParametersService.getLocation());
  


  }



  var openTabID = 0;
  $scope.openTab = {
    id: openTabID,
    name: '',
    bill: [],
    subtotal: 0.00,
    time: ''
  };
  $scope.openTabs = OpenTabsFactory.all();

  $scope.showPopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Enter New Tab Name',
      template: '<input type="text" ng-model="openTab.name" autofocus/>',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Open</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.openTab.name) {
            e.preventDefault();
          } else {
            $scope.openTab.time = new Date();
            OpenTabsFactory.add($scope.openTab);
            openTabID++;
            $scope.openTab = {
              id: openTabID,
              name: '',
              bill: [],
              subtotal: 0.00,
              time: ''
            };
          }
        }
      }]
    });

    $ionicModal.fromTemplateUrl('templates/closetabmodal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

  };

  $scope.askForLocation = function(){


    var myLocationPopup = $ionicPopup.show({


      template: '<input type="text" id="locationEntry" ng-model="location"  autofocus/>',
      title: 'Enter Location',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',

        onTap: function(e) {
              
              var location = document.getElementById("locationEntry").value;
              console.log("location" + location);
              SharedParametersService.setLocation(location);
              $scope.askForPIN();

          
            }
          }
          ]


        });
    
        
        
  };

  
  $scope.askForCard = function(){


    var myCardPopup = $ionicPopup.show({


      template: '<input type="text" id="cardEntry" ng-model="card"  autofocus/>',
      title: 'Enter Card Type',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',

        onTap: function(e) {
              
              var card = document.getElementById("cardEntry").value;
              console.log("card " + card);
              SharedParametersService.setCard(card);
              console.log(SharedParametersService.getCard());
              console.log("card after " + card);
              $scope.askForLocation();

          
            }
          }
          ]


        });                
  };


  $scope.askForPINlite = function(tab){

    //var location = $scope.askForLocation();
    var location = SharedParametersService.getLocation();
    console.log("location is" + location);


    var myPinPopup = $ionicPopup.show({


      template: '<input type="tel" id="pinliteEntry" ng-model="pinlite"  autofocus/>',
      title: 'Enter PIN',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',

        onTap: function(e) {
          
          var pinlite = document.getElementById("pinliteEntry").value;
          SMoKEAPIservice.getUserDetails(pinlite).then(function successCallback(response) {
          //Digging into the response to get the relevant data
          $scope.user = response;
          console.log(response);
          try{
          if($scope.user.data.firstname.length != 0){
            console.log($scope.user.data.employeeid);
            console.log("user found");
            SharedParametersService.setCurrentEmployee = $scope.user.data.employeeid;
            $scope.go("/tab/opentabs/{{tab.id}}");
            //$scope.showPopup();
            }
          }catch(err){
            //alert("PIN not found");
            console.log("no user found");
            $scope.askForPIN();
          }
          
        }, function errorCallback(response) {})             
              return pinlite;
            }
          }
          ]
        });
  };

  $scope.askForPIN = function(){

    //var location = $scope.askForLocation();
    var location = SharedParametersService.getLocation();
    console.log("location is" + location);


    var myPinPopup = $ionicPopup.show({


      template: '<input type="tel" id="pinEntry" ng-model="pin"  autofocus/>',
      title: 'Enter PIN',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',

        onTap: function(e) {
          
          var pin = document.getElementById("pinEntry").value;
          SMoKEAPIservice.getUserDetails(pin).then(function successCallback(response) {
          //Digging into the response to get the relevant data
          $scope.user = response;
          console.log(response);
          try{
          if($scope.user.data.firstname.length != 0){
            console.log($scope.user.data.employeeid);
            console.log("user found");

            


            var tzOffset = (new Date()).getTimezoneOffset() * 60000;
            var date = (new Date(Date.now() - tzOffset)).toISOString().replace(/z|t/gi,' ').replace(/\.[^.]*$/,'');  
            SMoKEAPIservice.addTab($scope.user.data.employeeid,$scope.user.data.firstname,location,SharedParametersService.getCard(),0,date).
            then(function successCallback(response){
            console.log(response);
            SMoKEAPIservice.getAllTabs().success(function(response){
              $scope.tabList = response;
              console.log(response);
            });
          })


            //$scope.showPopup();
            }
          }catch(err){
            //alert("PIN not found");
            console.log("no user found");
            $scope.askForPIN();
          }
          
        }, function errorCallback(response) {})             
              return pin;
            }
          }
          ]


        });
        
        
  };

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.remove = function(openTab) {
    OpenTabsFactory.remove(openTab);
  };
  $scope.openView = function() {
    $state.go('app.browse');
  };

})


.controller('SpecialsCtrl', function($scope,$location,SharedParametersService,$ionicPopup,SMoKEAPIservice) {

  $scope.go = function ( path ) {
    $location.path( path );
  };


  $scope.askForCard = function(location){
    SharedParametersService.setLocation(location);
    console.log(SharedParametersService.getLocation());

    var myCardPopup = $ionicPopup.show({


      template: '<input type="text" id="cardEntry" ng-model="card"  autofocus/>',
      title: 'Enter Card Type',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',

        onTap: function(e) {
              
              var card = document.getElementById("cardEntry").value;
              console.log("card " + card);
              SharedParametersService.setCard(card);
              console.log(SharedParametersService.getCard());
              console.log("card after " + card);
              $scope.askForPIN();         
            }
          }
          ]
        });                
  };


  $scope.askForPIN = function(){

    //var location = $scope.askForLocation();
    var location = SharedParametersService.getLocation();
    console.log("location is" + location);


    var myPinPopup = $ionicPopup.show({


      template: '<input type="tel" id="pinEntry" ng-model="pin"  autofocus/>',
      title: 'Enter PIN',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',

        onTap: function(e) {
          
          var pin = document.getElementById("pinEntry").value;
          SMoKEAPIservice.getUserDetails(pin).then(function successCallback(response) {
          //Digging into the response to get the relevant data
          $scope.user = response;
          console.log(response);
          try{
          if($scope.user.data.firstname.length != 0){
            console.log($scope.user.data.employeeid);
            console.log("user found");

            


            var tzOffset = (new Date()).getTimezoneOffset() * 60000;
            var date = (new Date(Date.now() - tzOffset)).toISOString().replace(/z|t/gi,' ').replace(/\.[^.]*$/,'');  
            SMoKEAPIservice.addTab($scope.user.data.employeeid,$scope.user.data.firstname,location,SharedParametersService.getCard(),0,date).
            then(function successCallback(response){
            console.log(response);
            
            
            SMoKEAPIservice.getAllTabs().success(function(response){
              $scope.go("/tab/opentabs");
            });
            
          })


            //$scope.showPopup();
            }
          }catch(err){
            //alert("PIN not found");
            console.log("no user found");
            $scope.askForPIN();
          }
          
        }, function errorCallback(response) {})             
              return pin;
            }
          }
          ]


        });
        
        
  };

  $scope.specials = [{
    title: 'Happy hour',
    amount: 25
  }, {
    title: 'Discount on Domestic',
    amount: 10
  }, {
    title: 'Discount on Imports',
    amount: 5
  }];
})

angular.module('starter.controllers', [])
/*
.controller('InventoryCtrl', function($scope, $stateParams, OpenTabsFactory, $http, SMoKEAPIservice,$location,$state,$timeout) {
  
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
  window.onerror = function (errorMsg, url, lineNumber) {
         alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
    }
})
*/

.controller('OpenTabCtrl', function($scope, $location,OpenTabsFactory, $ionicPopup, $http, $ionicModal,ScannedItemService,SMoKEAPIservice,SharedParametersService,$state,$timeout) {
  
  window.onerror = function (errorMsg, url, lineNumber) {
         alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
    }
/*
    $scope.navLogout = function(){
      alert("logout pressed");
      $ionicNavBarDelegate.title('Login');
      $state.go('login');

    }

    $scope.logout = function(){
      $state.go('login');
    }
*/
  $scope.nameFilter ={};
  $scope.tabList = [];
  //$scope.newTabFilter = null;
  //$scope.tempList = [];
  
  SMoKEAPIservice.getAllTabs().success(function(response){
      $scope.tabList = response;
      console.log(response);
  });
  
/*
  $scope.searchFilter = function (tab) {
    var re = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || re.test(tab.tabid) || re.test(tab.Driver.familyName);
  };
*/
  $scope.updateTabs = function(){
    SMoKEAPIservice.getAllTabs().success(function(response){
      $scope.tabList = response;
      console.log(response);
  });

  }

  console.log(SharedParametersService.getFilter());
  $scope.nameFilter.text = SharedParametersService.getFilter();
  //$scope.newTabFilter = SharedParametersService.getFilter();

  //window.onload = $scope.updateTabs();
  /*
  angular.element(document).ready(function (){
    console.log("testing");

  })
  

  $scope.$on('$viewContentLoaded', function() {
    console.log("viewContentLoaded");
});
*/
/*
$scope.$watch('nameFilter', function(newValue, oldValue) {

  console.log("oldValue" + oldValue);
  console.log("newValue" + newValue);
  console.log("nameFilter was changed");
  document.getElementById("searchtabs").value = SharedParametersService.getFilter();
  $scope.nameFilter.text = SharedParametersService.getFilter();
  $timeout(function(){
    $scope.$apply();

  })
  //update the DOM with newValue
});
*/
  $scope.$on('$stateChangeSuccess', function () {
    if($state.current.url == "/opentabs"){
    console.log("stateChangeSuccess");
    
    $scope.updateTabs();
    
    //document.getElementById("searchtabs").value = null;
    //console.log(SharedParametersService.getFilter());
    //$scope.nameFilter.text = SharedParametersService.getFilter();
    /*
    $timeout(function(){
      console.log("testing async model update");
      document.getElementById("searchtabs").value = SharedParametersService.getFilter();
      $scope.applyModelSynchronously();
      $scope.$apply($scope.nameFilter);
      
      $scope.nameFilter = SharedParametersService.getFilter();
      console.log($scope.nameFilter);
    $scope.$apply();
    

    })
    //$scope.newTabFilter = SharedParametersService.getFilter();
    */
    }
});


 function editModel() {
  $scope.nameFilter.text = SharedParametersService.getFilter();
  /* Do not apply your scope here since we don't know if that
     function is called synchronously from Angular or from an
     asynchronous code */
}

// Processed by Angular, for instance called by a ng-click directive
$scope.applyModelSynchronously = function() {
  // No need to digest
  editModel();
}

// Any kind of asynchronous code, for instance a server request
//callServer(function() {
  /* That code is not watched nor digested by Angular, thus we
     can safely $apply it */
 // $scope.$apply(editModel);
//}); 
/*
  $scope.$on('$routeChangeSuccess', function () {
    console.log("routeChangeSuccess");
});
*/
  $scope.go = function ( path ) {
    $location.path( path );
    //$state.go('path');
  };
/*
  $scope.mobilego = function( path ){
    //alert('mobilego');
    //$state.go('tab.opentabs-locations');
    //$location.url('/tab/locations');
    $timeout(function(){
      $scope.$apply(function() {
     $location.url('/tab/locations').replace();
    });

   })
  }
*/
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


/*
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
*/



  $scope.askForLocation = function(){

    //cordova.plugins.Keyboard.disableScroll(false);

    var myCardPopup = $ionicPopup.show({


      template: '<input type="text" id="seatEntry" ng-model="seat"  autofocus/>',
      title: 'Scan or Type Seat',
      scope: $scope,
      cssClass: 'my-custom-popup',
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',

        onTap: function(e) {
              
              var seat = document.getElementById("seatEntry").value;
              console.log("seat " + seat);
              SharedParametersService.setLocation(seat);
              console.log(SharedParametersService.getLocation());
              $scope.askForCard();
                    
            }
          }
          ]
        });                
  };
  
  $scope.askForCard = function(){


    var myCardPopup = $ionicPopup.show({


      template: '<input type="text" id="cardEntry" ng-model="card"  autofocus/>',
      title: 'Enter Card Description',
      scope: $scope,
      cssClass: 'my-custom-popup',
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
              //$scope.askForLocation();
              SMoKEAPIservice.getAllTabs().success(function(response){
                    $scope.newTab();
                 });
    
            }
          }
          ]


        });                
  };

  $scope.newTab = function(){

          var currlocation = SharedParametersService.getLocation();
          console.log("location is" + currlocation);
          //var pin = document.getElementById("pinEntry").value;
          var pin = 1111;
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
            SMoKEAPIservice.addTab($scope.user.data.employeeid,$scope.user.data.firstname,currlocation,SharedParametersService.getCard(),0,date).
            then(function successCallback(response){
            console.log(response);
            
            
            SMoKEAPIservice.getAllTabs().success(function(response){
              
              $scope.tempList = response;
              //console.log("sort this: " + $scope.tempList);
              var latestid = $scope.tempList.slice(-1)[0].id;
              console.log(latestid);
              //document.getElementById("searchtabs").value = latestid;

              //$scope.go("/tab/opentabs");
              SharedParametersService.setFilter(latestid);

              SharedParametersService.setCurrentEmployee($scope.user.data.employeeid);
              SharedParametersService.setEmpName($scope.user.data.firstname);
              SharedParametersService.setCurrentTabID(latestid);

              console.log("empid: " + SharedParametersService.getCurrentEmployee());
              console.log("name: " + SharedParametersService.getEmpName());

              //cordova.plugins.Keyboard.disableScroll(true);
              
              $scope.go("/tab/opentabs/"+latestid);

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

   $scope.tabGo = function(tab){
      SharedParametersService.setCurrentTabID(tab.id);

       var pinlite = SharedParametersService.getCurrentPW();
          SMoKEAPIservice.getUserDetails(pinlite).then(function successCallback(response) {
          //Digging into the response to get the relevant data
          $scope.user = response;
          console.log(response);
          try{
          if($scope.user.data.firstname.length != 0){
            console.log($scope.user.data.employeeid);
            console.log("user found");
            SharedParametersService.setCurrentEmployee($scope.user.data.employeeid);
            SharedParametersService.setEmpName($scope.user.data.firstname);

            console.log("empid: " + SharedParametersService.getCurrentEmployee());
            console.log("name: " + SharedParametersService.getEmpName());

            $scope.go("/tab/opentabs/{{tab.id}}");
            //$scope.showPopup();
            }
          }catch(err){
            //alert("PIN not found");
            console.log("no user found");
            console.log(err);
            alert("error");
          }
          
        }, function errorCallback(response) {})             
              return pinlite;
   }

  


  $scope.askForPINlite = function(tab){

    //var location = $scope.askForLocation();
    var seat = SharedParametersService.getLocation();
    console.log("location is" + seat);

    SharedParametersService.setCurrentTabID(tab.id);
   


    var myPinPopup = $ionicPopup.show({


      template: '<input type="tel" id="pinliteEntry" ng-model="pinlite"  autofocus/>',
      title: 'Enter PIN',
      scope: $scope,
      cssClass: 'my-custom-popup',
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
            SharedParametersService.setCurrentEmployee($scope.user.data.employeeid);
            SharedParametersService.setEmpName($scope.user.data.firstname);

            console.log("empid: " + SharedParametersService.getCurrentEmployee());
            console.log("name: " + SharedParametersService.getEmpName());

            $scope.go("/tab/opentabs/{{tab.id}}");
            //$scope.showPopup();
            }
          }catch(err){
            //alert("PIN not found");
            console.log("no user found");
            $scope.askForPINlite();
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
    var seat = SharedParametersService.getLocation();
    console.log("location is" + seat);


    var myPinPopup = $ionicPopup.show({


      template: '<input type="tel" id="pinEntry" ng-model="pin"  autofocus/>',
      title: 'Enter PIN',
      scope: $scope,
      cssClass: 'my-custom-popup',
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
            SMoKEAPIservice.addTab($scope.user.data.employeeid,$scope.user.data.firstname,seat,SharedParametersService.getCard(),0,date).
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


.controller('SpecialsCtrl', function($scope,$location,SharedParametersService,$ionicPopup,SMoKEAPIservice,$state,$timeout) {
window.onerror = function (errorMsg, url, lineNumber) {
         alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
    }
  $scope.tempList = [];

  $scope.go = function ( path ) {
    $location.path( path );
    //$state.go('path');
  };

  $scope.mobilego = function( path ){
    //alert('mobilego');
    //$state.go('tab.opentabs-locations');
    //$location.url('/tab/locations');
    $timeout(function(){
      $scope.$apply(function() {
     $location.url('/tab/locations').replace();
    });

   })
  }


  $scope.askForCard = function(seat){
    SharedParametersService.setLocation(seat);
    console.log(SharedParametersService.getLocation());

    var myCardPopup = $ionicPopup.show({


      template: '<input type="text" id="cardEntry" ng-model="card"  autofocus/>',
      title: 'Enter Card Type',
      scope: $scope,
      cssClass: 'my-custom-popup',
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
    var currlocation = SharedParametersService.getLocation();
    console.log("location is" + currlocation);


    var myPinPopup = $ionicPopup.show({


      template: '<input type="tel" id="pinEntry" ng-model="pin"  autofocus/>',
      title: 'Enter PIN',
      scope: $scope,
      cssClass: 'my-custom-popup',
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
            SMoKEAPIservice.addTab($scope.user.data.employeeid,$scope.user.data.firstname,currlocation,SharedParametersService.getCard(),0,date).
            then(function successCallback(response){
            console.log(response);
            
            
            SMoKEAPIservice.getAllTabs().success(function(response){
              
              $scope.tempList = response;
              //console.log("sort this: " + $scope.tempList);
              var latestid = $scope.tempList.slice(-1)[0].id;
              console.log(latestid);
              //document.getElementById("searchtabs").value = latestid;

              //$scope.go("/tab/opentabs");
              SharedParametersService.setFilter(latestid);

              SharedParametersService.setCurrentEmployee($scope.user.data.employeeid);
              SharedParametersService.setEmpName($scope.user.data.firstname);
              SharedParametersService.setCurrentTabID(latestid);

              console.log("empid: " + SharedParametersService.getCurrentEmployee());
              console.log("name: " + SharedParametersService.getEmpName());
              
              $scope.go("/tab/opentabs/"+latestid);

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

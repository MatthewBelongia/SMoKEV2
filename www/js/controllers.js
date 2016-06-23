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


.controller('OpenTabCtrl', function($scope, OpenTabsFactory, $ionicPopup, $http, $ionicModal,ScannedItemService,SMoKEAPIservice,SharedParametersService) {
  
  $scope.nameFilter =null;
  $scope.tabList = [];

  SMoKEAPIservice.getAllTabs().success(function(response){
      $scope.tabList = response;
      console.log(response);
  });

  $scope.changeTabID = function(tab){
    SharedParametersService.setCurrentTabID(tab.id);
    SharedParametersService.setCurrentEmployee(tab.empId);

    console.log(tab);

    console.log("currentID: " + SharedParametersService.getCurrentTabID());
    console.log("currentempid: " + SharedParametersService.getCurrentEmployee());

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

  $scope.askForPIN = function(){


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

            var date = (new Date).toISOString().replace(/z|t/gi,' ').replace(/\.[^.]*$/,'');  
            SMoKEAPIservice.addTab(SharedParametersService.getCurrentEmployee(),'snoop','Moon','VISA',7.33,date).
            then(function successCallback(response){
            console.log(response);
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


.controller('SpecialsCtrl', function($scope) {
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

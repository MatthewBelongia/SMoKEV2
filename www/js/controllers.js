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


.controller('OpenTabCtrl', function($scope, OpenTabsFactory, $ionicPopup, $http, $ionicModal,ScannedItemService) {
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

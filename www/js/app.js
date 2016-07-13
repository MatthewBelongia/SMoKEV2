angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.billController', 'angularMoment'])

.run(function($ionicPlatform) {

  ionic.Platform.isFullScreen = true;
  //cordova.plugins.Keyboard.disableScroll(false);
    
   
    $ionicPlatform.ready(function() {



      
      
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //cordova.plugins.Keyboard.disableScroll(true);
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(false);
      }
      
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      /*
      .state('tab.inventory', {
        url: '/inventory',
        views: {
          'tab-inventory': {
            templateUrl: '/templates/tab-inventory.html',
            controller: 'InventoryCtrl'
          }
        }
      })
      */
      .state('tab.opentabs', {
        url: '/opentabs',
        views: {
          'tab-opentabs': {
            templateUrl: 'templates/tab-opentabs.html',
            controller: 'OpenTabCtrl'
          }
        }
      })
      .state('tab.opentab-bill', {
        url: '/opentabs/:tabID',
        views: {
          'tab-opentabs': {
            templateUrl: 'templates/opentabs-bill.html',
            controller: 'BillCtrl'
          }
        }
      })
      .state('tab.opentabs-locations', {
        url: '/locations',
        views: {
          'tab-locations': {
            templateUrl: '/templates/opentabs-locations.html',
            controller: 'SpecialsCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/tab/opentabs');
  });

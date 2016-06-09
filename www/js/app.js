angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.billController', 'angularMoment'])

.run(function($ionicPlatform) {
    
   
    $ionicPlatform.ready(function() {

      
      
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //cordova.plugins.Keyboard.disableScroll(true);
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
      .state('tab.inventory', {
        url: '/inventory',
        views: {
          'tab-inventory': {
            templateUrl: '/templates/tab-inventory.html',
            controller: 'InventoryCtrl'
          }
        }
      })
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
      .state('tab.specials', {
        url: '/specials',
        views: {
          'tab-specials': {
            templateUrl: '/templates/tab-specials.html',
            controller: 'SpecialsCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/tab/opentabs');
  });

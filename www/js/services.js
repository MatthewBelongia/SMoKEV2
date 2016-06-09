angular.module('starter.services', [])

.factory('OpenTabsFactory', function() {

  var openTabs = [];

  return {
    all: function() {
      return openTabs;
    },
    add: function(openTab) {
      openTabs.push(openTab);
    },
    remove: function(openTab) {
      openTabs.splice(openTabs.indexOf(openTab), 1);
    },
    get: function(tabID) {
      for (var i = 0; i < openTabs.length; i++) {
        if (openTabs[i].id === parseInt(tabID)) {
          return openTabs[i];
        }
      }
      return null;
    }
  };
})

.factory('SMoKEAPIservice', function($http) {


    getItemDetails = function(id) {
      return $http({
        method: 'GET',
        url: 'http://192.168.1.189:8080/id?id=' + id
      });
    }

    return{
      getItemDetails: getItemDetails, //Comma?
    }
  });

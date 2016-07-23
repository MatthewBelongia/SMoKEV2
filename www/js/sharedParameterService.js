angular.module('starter.services', [])

.service('SharedParametersService',function(){

  var currentTabID =0;
  var currentEmployee = "";
  var empName = "";
  var seat = "";
  var card = "";
  var filter = "";
  var selectedItem = {};
  var currentPW = "";

  
  return{
    getCurrentTabID: function(){
      return currentTabID;
    },
    setCurrentTabID: function(value){
      currentTabID = value;
    },
    getCurrentEmployee: function(){
      return currentEmployee;
    },
    setCurrentEmployee: function(value){
      currentEmployee = value;
    },
    getEmpName : function(){
      return empName;
    },
    setEmpName : function(value){
      empName = value;
    },
    getLocation : function(){
      return seat;
    },
    setLocation : function(value){
      seat = value;
    },
    getCard : function(){
      return card;
    },
    setCard : function(value){
      card = value;
    },
    getFilter : function(){
      return filter;
    },
    setFilter : function(value){
      filter = value;
    },
    getItem : function(){
      return selectedItem;
    },
    setItem : function(value){
      selectedItem = value;
    },
    getCurrentPW : function(){
      return currentPW;
    },
    setCurrentPW : function(value){
      currentPW = value;
    },

  };

})

.service('ScannedItemService',function(){
  this.scannedItem = "";

  this.setScannedItem = function(input){
      this.scannedItem = input;
  };
  this.getScannedItem = function(){
      return this.scannedItem;
  };
})

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


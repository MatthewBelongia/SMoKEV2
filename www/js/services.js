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

.factory('SMoKEAPIservice', function($http) {

    getItemDetails = function(id) {
      return $http({
        method: 'GET',
        url: 'http://192.168.1.189:8080/sku?sku=' + id
      });
    }

    getCigarDetails = function(cigarid){
      return $http({
        method: 'GET',
        url: 'http://192.168.1.189:8080/cigarid?id=' + cigarid
      });
    }

     getUserDetails = function(pin) {
      return $http({
        method: 'GET',
        url: 'http://192.168.1.189:8080/pw?password=' + pin
      });
    }

    addTab = function(empid,name,seat,card,total,date){
        return $http({

          method:'GET',
          url: 'http://192.168.1.189:8080/newtab?empid='+empid+'&name='+name
          +'&location='+seat+'&card='+card+'&date='+date
        });
        //+'&total='+total
    }

    addTabItem = function(tabid,cigarid,retail,quantity,discount,finalamount,timestamp,coalcount,hookahbuilder,salesemployeeid){
      return $http({
        method: 'GET',
        url: 'http://192.168.1.189:8080/addtabitem?tabid='+tabid+'&cigarid='+cigarid
        +'&retail='+retail+'&quantity='+quantity+'&discount='+discount
        +'&finalamount='+finalamount+'&timestamp='+timestamp+'&coalcount='+coalcount
        +'&hookahbuilder='+hookahbuilder+'&salesemployeeid='+salesemployeeid
      });
    }

    getAllTabs = function(){

      return $http({
        method:'GET',
        url: 'http://192.168.1.189:8080/tab'

      });
    }

    getTabItems = function(tabid){

      return $http({
          method: 'GET',
          url: 'http://192.168.1.189:8080/gettabitem?tabid='+tabid

      });
    }

    deleteTabItem = function(id){

      return $http({
          method: 'GET',
          url: 'http://192.168.1.189:8080/deletetabitem?id='+id

      });
    }

    addQuantityTabItem = function(tabitemid){
      return $http({
          method: 'GET',
          url: 'http://192.168.1.189:8080/addquantity?id='+tabitemid
      });
    }

    removeQuantityTabItem = function(tabitemid){
      return $http({

          method: 'GET',
          url: 'http://192.168.1.189:8080/removequantity?id='+tabitemid
      });
    }

    return{
      getItemDetails: getItemDetails, //Comma?
      getCigarDetails: getCigarDetails,
      getUserDetails: getUserDetails,
      addTab: addTab,
      addTabItem: addTabItem,
      getAllTabs: getAllTabs,
      getTabItems: getTabItems,
      deleteTabItem: deleteTabItem,
      addQuantityTabItem : addQuantityTabItem,
      removeQuantityTabItem : removeQuantityTabItem,

    }
  });

// 10.0.0.24:8080 IP SMoKE

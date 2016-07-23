angular.module('smokeAPIService', [])



.factory('SMoKEAPIservice', function($http) {

  //Change all url back to http://192.168.1.189:8080

    var mainUrl = 'http://localhost:8080';

    getItemDetails = function(id) {
      return $http({
        method: 'GET',
        url: mainUrl + '/sku?sku=' + id
      });
    }

    getCigarDetails = function(cigarid){
      return $http({
        method: 'GET',
        url: mainUrl + '/cigarid?id=' + cigarid
      });
    }

     getUserDetails = function(pin) {
      return $http({
        method: 'GET',
        url: mainUrl + '/pw?password=' + pin
      });
    }

    addTab = function(empid,name,seat,card,total,date){
        return $http({

          method:'GET',
          url: mainUrl + '/newtab?empid='+empid+'&name='+name
          +'&location='+seat+'&card='+card+'&date='+date
        });
        //+'&total='+total
    }

    addTabItem = function(tabid,cigarid,retail,quantity,discount,finalamount,timestamp,coalcount,hookahbuilder,salesemployeeid){
      return $http({
        method: 'GET',
        url: mainUrl + '/addtabitem?tabid='+tabid+'&cigarid='+cigarid
        +'&retail='+retail+'&quantity='+quantity+'&discount='+discount
        +'&finalamount='+finalamount+'&timestamp='+timestamp+'&coalcount='+coalcount
        +'&hookahbuilder='+hookahbuilder+'&salesemployeeid='+salesemployeeid
      });
    }

    getAllTabs = function(){

      return $http({
        method:'GET',
        url: mainUrl + '/tab'

      });
    }

    getTabItems = function(tabid){

      return $http({
          method: 'GET',
          url: mainUrl + '/gettabitem?tabid='+tabid

      });
    }

    deleteTabItem = function(id){

      return $http({
          method: 'GET',
          url: mainUrl + '/deletetabitem?id='+id

      });
    }

    addQuantityTabItem = function(tabitemid){
      return $http({
          method: 'GET',
          url: mainUrl + '/addquantity?id='+tabitemid
      });
    }

    removeQuantityTabItem = function(tabitemid){
      return $http({

          method: 'GET',
          url: mainUrl + '/removequantity?id='+tabitemid
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

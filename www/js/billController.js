angular.module('starter.billController', [])



.controller('BillCtrl', function($scope, $stateParams, OpenTabsFactory, $ionicPopover, $http, SMoKEAPIservice,$ionicPopup,ScannedItemService,SharedParametersService) {

//console.log("getScanneditem: " + ScannedItemService.getScannedItem());
document.getElementById("scaninput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        var input = document.getElementById("scaninput").value;
        ScannedItemService.setScannedItem(input);
        console.log("getScanneditem: " + ScannedItemService.getScannedItem());

        document.getElementById("scannerbutton").click();
    }
    });


  $scope.tabOwner = "";
  $scope.tabOwner = SharedParametersService.getEmpName();
  console.log($scope.tabOwner);

  $scope.tabLocation = "";
  $scope.tabLocation = SharedParametersService.getLocation();
  console.log($scope.tabLocation);

  $scope.updateTabOwner = function(){
    $scope.tabOwner = SharedParametersService.getEmpName();
    console.log($scope.tabOwner);
  }

  $scope.tabItemList = [];
  $scope.subtotal = 0;

  SMoKEAPIservice.getTabItems(SharedParametersService.getCurrentTabID()).success(function(response){
      console.log("currentID: " + SharedParametersService.getCurrentTabID());
      $scope.tabItemList = response;
      console.log($scope.tabItemList);
      for(var tabI in $scope.tabItemList){
        console.log($scope.tabItemList[tabI].retail);
        $scope.subtotal+= $scope.tabItemList[tabI].retail;
      }
  });
  console.log("subtotal :" + $scope.subtotal);
  $scope.tabItemCurrent = $scope.tabItemList[0];


  $scope.openTab = OpenTabsFactory.get($stateParams.tabID);
  console.log($scope.openTab);
  $scope.id = '';
  $scope.item = null;
  $scope.user = null;
  $scope.pin = '';
  console.log("pin is" + $scope.pin);
  var calcTotal = 0;
  var sub = $scope.item;

  /*
  for(let sub of $scope.openTab.bill){
      calcTotal += item.data.cost;
   }
   */

  //$scope.subtotal = calcTotal;
  window.onerror = function (errorMsg, url, lineNumber) {
         alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
    }

  $scope.cigarName = null;
  $scope.testCigar = null;

/*
  $scope.$watch("tabItemList", function(){
    console.log($scope.tabItemList);
    for(var tabItem in $scope.tabItemList){
          if (!$scope.tabItemList.hasOwnProperty(tabItem)) continue;
          var testCigar = null;
          var obj = $scope.tabItemList[tabItem];
            for(var prop in obj ) {
                  if(!obj.hasOwnProperty(prop)) continue;

                  if(prop == "cigarid"){
                  console.log(obj[prop]);
                  $scope.testCigar  = SMoKEAPIservice.getCigarDetails(obj[prop]);
                  console.log(testCigar);
                  break;
                  }          
            }
            

    };

  });

  */

  $scope.getCigarName = function(cigarItem){

      if(null != cigarItem ){
      cigarItem.name = {};
      //console.log(cigarItem);
      SMoKEAPIservice.getCigarDetails(cigarItem.cigarid).then(function successCallback(response){
          console.log(response);
          cigarItem.name = response.data.name; 
          /*
          $scope.cigarName = response.data.name;
          console.log($scope.cigarName);
          */
          console.log(cigarItem);

      });
      }
  };

  $scope.showPopup = function() {

    var myPopup = $ionicPopup.show({


      template: '<input type="number" id="scannerbox" ng-model="data.scanned"  autofocus/>',
      title: 'Scan Item',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',

        onTap: function(e) {

          //alert("input is: " + $scope.data.scanned);
          $scope.id = $scope.data.scanned;
          SMoKEAPIservice.getItemDetails($scope.id).then(function successCallback(response) {
          //Digging into the response to get the relevant data
          $scope.item = response;
          
          $scope.openTab.bill.push($scope.item);
          
          
        }, function errorCallback(response) {})
             
              return $scope.id;
            }
          }
          ]
        });
        return $scope.id;
      }


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
            console.log("user found");
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
      

      }

  $scope.addItem = function() {
    var inputbox = document.getElementById("scaninput").value;
    console.log("scanneditem is:" + ScannedItemService.getScannedItem());

    $scope.id = inputbox;
          SMoKEAPIservice.getItemDetails($scope.id).then(function successCallback(response) {
          //Digging into the response to get the relevant data
          $scope.item = response;
          console.log(response);
          console.log("openTab.bill: " + $scope.openTab.bill);
          $scope.openTab.bill.push($scope.item);
          document.getElementById("scaninput").value = "";
          
          
        }, function errorCallback(response) {})
              //alert(response);
              //alert("item not found");
              console.log($scope.id);
              document.getElementById("scaninput").value = "";
              return $scope.id;

   $scope.id = '';
 };

 $scope.addToTab = function(){
    var inputbox = document.getElementById("scaninput").value;

    $scope.id = inputbox;
          SMoKEAPIservice.getItemDetails($scope.id).then(function successCallback(response) {
          //Digging into the response to get the relevant data
          $scope.item = response;
          console.log(response);
          /*
          console.log("openTab.bill: " + $scope.openTab.bill);
          $scope.openTab.bill.push($scope.item);
          */
          document.getElementById("scaninput").value = "";
          
          var time = (new Date).toISOString().replace(/z|t/gi,' ').replace(/\.[^.]*$/,'');
          
          console.log(time);
          SMoKEAPIservice.addTabItem(SharedParametersService.getCurrentTabID(),response.data.id,response.data.coststick,1,0,response.data.coststick,time,0,"test",SharedParametersService.getCurrentEmployee())
          .then(function successCallback(response){
            SMoKEAPIservice.getTabItems(SharedParametersService.getCurrentTabID()).success(function(response){
              console.log("currentID: " + SharedParametersService.getCurrentTabID());
              $scope.tabItemList = response;
            });
          })
          
          
          
        }, function errorCallback(response) {})
              //alert(response);
              //alert("item not found");
              console.log($scope.id);
              document.getElementById("scaninput").value = "";
              return $scope.id;

   $scope.id = '';
 };
 

 $ionicPopover.fromTemplateUrl('templates/popover.html', {
  scope: $scope
}).then(function(popover) {
  $scope.popover = popover;
});
$scope.openPopover = function($event) {
  $scope.popover.show($event);
};
$scope.voidItem = function(item) {
  $scope.openTab.bill.splice($scope.openTab.bill.indexOf(item), 1);
  $scope.openTab.subtotal -= item.price;
};
$scope.reOrderItem = function(item) {};
})


.directive('cigarDirective',function(SMoKEAPIservice){
  return {
    scope: {
      cigarid: '&'
      //other: {{ tabItemList }} 
      //SMoKEAPIservice.getCigarDetails(tabItem.id)
    },
    restrict: "E",

    //template: '<ion-item> test </ion-item>',
    /*
    link: function(scope,element,attrs){
      console.log('get name of cigar',scope.name);
    },
    */
    controller: 'BillCtrl'
    
  };
});

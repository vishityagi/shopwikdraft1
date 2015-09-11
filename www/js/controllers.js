'use strict';
angular.module('reviewBook.controllers', ['ionic', 'reviewBook.services'])


/*
Controller for the d page
*/
.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})
.controller('ReviewsCtrl', function($scope,$window,$ionicPopup, Document,reciever) {
  
  $scope.itemlist=['Jeans','Formal Pant','Shirt','T-shirt'];
  $scope.none={};
  $scope.search = function(phoneNum){
    Document.searchphn(phoneNum).then(function(documents){
      if(documents.length === 1)
        $scope.customer = documents[0];
    });
  };
    $scope.update = function(customer) {
      if(customer.stars <0 || customer.stars>10){
        //alert('stars should be in range(0-10)!');
        $scope.showAlert1 = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Wrong input!',
     template: 'stars should be in range(0-10)'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
 $scope.showAlert1();
      }
      else if(customer.name === ''||customer.name===undefined||customer.phoneNum===''||customer.phoneNum===undefined){
        //alert('required fields must be filled up.');
        $scope.showAlert2 = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Empty fields!',
     template: 'Name and mobile no are mandatory'
   });
   alertPopup.then(function(res) {
     console.log('pls fill');
   });
 };
 $scope.showAlert2();
      }
      else{

    $scope.master = angular.copy(customer);
    Document.searchphn(customer.phoneNum).then(function(documents){
        $scope.customers = documents;
        if(documents.length === 0){ Document.add($scope.master);}
        else
        {
          Document.removecustomer($scope.master);
          Document.add($scope.master);
        }
        });
     $scope.reset();
     $window.location='#/tab/Customers';
   }
  };
   $scope.reset = function() {
    
    $scope.customer = angular.copy($scope.none);

  };
  $scope.reset();
    
  })
.controller('MessageCtrl', function($scope,$http,reciever,Messages,$window) {
  $scope.none={};
    $scope.update = function(msg) {

    $scope.master = angular.copy(msg);
    Messages.addmsg($scope.master);  
     

  };
   $scope.reset = function() {
    $scope.clearlist();
    $scope.msg = angular.copy($scope.none);

  };
   $scope.msgs = [];
   Messages.allmsg().then(function(msgs){
        $scope.messages = msgs;
    });
   $scope.deleteall = function(){
    Messages.deleteall();
     $scope.allmsg();
   }
  $scope.remove = function(msg){ 
      $scope.master = angular.copy(msg);
   Messages.removemsg($scope.master);
    Messages.allmsg().then(function(msgs){
        $scope.messages = msgs;});

 };
  $scope.search = function(status){ 
     $scope.master = angular.copy(status);
   Messages.searchmsg($scope.master).then(function(msgs){
        $scope.messages = msgs;
    });
 };
    $scope.allmsg = function(){ 
   Messages.allmsg().then(function(msgs){
        $scope.messages = msgs;
    });

};
    $scope.items=reciever.recievers;
    $scope.clearlist=function(){
      reciever.clearall();
    };
$scope.checked = reciever.recievers;
//$scope.checked = [];


    // Get Total Checked Items
     $scope.no = $scope.checked.length;
  
    $scope.send = function(msg){
      $scope.update(msg);
      $scope.msgtext=msg.texts;
      if(reciever.recievers){
      var request = $http({
                        method : 'POST',
                        url : 'api/message.php',
                        data: {
                    recieve: $scope.checked.phoneNum,
                    no: $scope.no,
                    text: $scope.msgtext

                    
                },
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                })
                .success(function(data,status,headers,config){

                        
                        console.log("success");
        $scope.showAlert3 = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Login info!',
     template: data
   });
   alertPopup.then(function(res) {
     console.log('returned');
   });
 };
 $scope.showAlert3();
                        $window.location=data;
                        
                      });
              }

    };
  })

.controller('editCtrl',function($scope,$window,$ionicPopup,user,Document){
$scope.init = function(){
    $scope.actUser=user.customers[0];
};
  $scope.update = function(actUser) {
     if(actUser.stars <0 || actUser.stars>10){
        //alert('stars should be in range(0-10)!');
        $scope.showAlert1 = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Wrong input!',
     template: 'stars should be in range(0-10)'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
 $scope.showAlert1();
      }
      else if(actUser.name === ''||actUser.name===undefined||actUser.phoneNum===''||actUser.phoneNum===undefined){
        //alert('required fields must be filled up.');
        $scope.showAlert2 = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Empty fields!',
     template: 'Name and mobile no are mandatory'
   });
   alertPopup.then(function(res) {
     console.log('pls fill');
   });
 };
 $scope.showAlert2();
}
else{
   
    $scope.master=angular.copy(actUser);
    Document.removecustomer($scope.master);
     Document.add($scope.master);
     $window.location='#/tab/Customers';  
   }
  };
$scope.init();
})
.controller('CustomersCtrl', function($scope,$window,$ionicPopup, Document,reciever,user) {

  // get the list of our customers from the Document service
    $scope.documents = [];
    $scope.document = null;
    // Get all the documents
    Document.all().then(function(documents){
        $scope.customers = documents;
    });
  $scope.edit = function(customer) {
    $scope.master = angular.copy(customer);

    user.addme($scope.master);
    $window.location='#/edit';
  }

  $scope.remove = function(customer){ 
    $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete Customer Details?',
     template: 'Are you sure you want to delete Details of '+customer.name+'?'
   });
   confirmPopup.then(function(res) {
     if(res) {
        $scope.master = angular.copy(customer);
   Document.removecustomer($scope.master);
    Document.all().then(function(documents){
        $scope.customers = documents;});
     } 
   });
 };
 $scope.showConfirm();
    Document.all().then(function(documents){
        $scope.customers = documents;});
 };
  $scope.search = function(name){ 
     $scope.master = angular.copy(name);
   Document.searchcustomer($scope.master).then(function(documents){
        $scope.customers = documents;
    });
 };
    $scope.all = function(){ 
   Document.all().then(function(documents){
        $scope.customers = documents;
    });

};
$scope.toggleChecked=function(customer){
  reciever.toggleReciever(customer);
};

$scope.checked = reciever.recievers;
//$scope.checked = [];


    // Get Total Checked Items
    $scope.getTotalCheckedItems = function () {
        return $scope.checked.length;
    };
    /* $scope.toggleChecked = function (customer) {
          var count=0;
          for(var i = $scope.checked.length - 1; i >= 0; i--)
          {
            if($scope.checked[i].name == customer.name){
            $scope.checked.splice(i,1);
            count ++;
            
          }
          }
          if(count==0)
            $scope.checked.push(customer);
        
    };*/

    $scope.all();
})
.controller('ImageController', function($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {
 
  $ionicPlatform.ready(function() {
    $scope.images = FileService.images();
    $scope.$apply();
  });
 
  $scope.urlForImage = function(imageName) {
    var trueOrigin = cordova.file.dataDirectory + imageName;
    return trueOrigin;
  };
 
  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Take photo' },
        { text: 'Photo from library' }
      ],
      titleText: 'Add images',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.addImage(index);
      }
    });
  };
 
  $scope.addImage = function(type) {
    $scope.hideSheet();
    ImageService.handleMediaDialog(type).then(function() {
      $scope.$apply();
    });
  };
  
  $scope.sendEmail = function() {
    if ($scope.images != null && $scope.images.length > 0) {
      var mailImages = [];
      var savedImages = $scope.images;
      if ($cordovaDevice.getPlatform() == 'Android') {
        // Currently only working for one image..
        var imageUrl = $scope.urlForImage(savedImages[0]);
        var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
        var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
        $cordovaFile.copyFile(namePath, name, cordova.file.externalRootDirectory, name)
        .then(function(info) {
          mailImages.push('' + cordova.file.externalRootDirectory + name);
          $scope.openMailComposer(mailImages);
        }, function(e) {
          reject();
        });
      } else {
        for (var i = 0; i < savedImages.length; i++) {
          mailImages.push('' + $scope.urlForImage(savedImages[i]));
        }
      }
    }
  }
  
})

/*
Controller for the Reviews page
*/
.controller('remindersCtrl', ['$scope','Reminders',function($scope,Reminders) {
     $scope.reminders = [];
    $scope.reminders = null;
    // Get all the documents
    Reminders.allreminders().then(function(reminder){
        $scope.reminders = reminder;
    });
  $scope.remove = function(reminder){ 
      $scope.master = angular.copy(reminder);
   Reminders.removereminder($scope.master);
    Reminders.allreminders().then(function(reminders){
        $scope.reminders = reminders;});
 };
  $scope.search = function(name){ 
     $scope.master = angular.copy(name);
   Reminders.searchreminder($scope.master).then(function(reminder){
        $scope.reminders = reminder;
    });
 };
    $scope.all = function(){ 
   Reminders.all().then(function(reminder){
        $scope.reminders = reminder;
    });

};

}])


.controller('setReminderCtrl', ['$scope','Reminders',function($scope,Reminders) {
    $scope.none={};
        $scope.update= function(reminder) {
          if(reminder.name===''||reminder.name===null||reminder.phoneNum===''||reminder.phoneNum===null)
          {
     $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Empty!',
     template: 'Pls fill up name and phoneNum'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
          }
          else{

        $scope.R = angular.copy(reminder);
        Reminders.addreminder($scope.R);
          
        }
      };
       $scope.reset = function() {
        
        $scope.reminder = angular.copy($scope.none);

      };
      $scope.reset();
    

}])

.controller('loginCtrl',function($scope,$http,$window) {
    // Wait for Cordova to load
    // Wait for Cordova to load
 $scope.check = function (email,password) {
        /*
        * Validate the Email and Password using Regular Expression.
        * Once Validated call the PHP file using HTTP Post Method.
        */
        /*
        * Validate Email and Password.
        * Email shound not be blank, should contain @ and . and not more than 30 characters.
        * Password Cannot be blank, not be more than 12 characters, should not contain 1=1.
        * Set the Messages to Blank each time the function is called.
        */
        
        $scope.message = "";
        $scope.memail = angular.copy(email);
        $scope.mpassword = angular.copy(password);
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var error = 0;
        if ($scope.memail === "" || $scope.memail === null) {
            error = 1;
        }
        if (!emailReg.test($scope.memail)) {
           error = 2;
        }
        /*---- Email is validated ------ */
       if ($scope.mpassword === "" || $scope.mpassword === null) {
            error = 3;
        }
        if (error === 0) {
            var request = $http({
                        method : 'POST',
                        url : 'api/login.php',
                        data: {
                    email: $scope.memail,
                    pass: $scope.mpassword
                },
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                })
                .success(function(data,status,headers,config){

                        
                        console.log("success");

                $scope.message = "PHP returned: " + data;
                
                if(data.trim()==="" || data.trim() === 'false'){ $scope.message = "You have Filled Wrong Details! ";}
                else
                {$window.location=data;}
                
                    })
                .error(function(data,status,headers,config){
                        console.log('unable to submit');
                });
        

            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (response) {

               // $scope.message = "PHP returned:" + data + '';
               // if(response.data === "false"){ $scope.message = "You have Filled Wrong Details! ";}
               // else
                //$window.location=data;

            });
        }
        else {
            $scope.message = "You have Filled Wrong Details! Error: " + error;
        }
    }
     
})

/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

})
.controller('MainCtrl', function($scope) {

})
/*.controller('homeCtrl',['$scope',function($scope
    $scope.text="Home Page";
}])*/
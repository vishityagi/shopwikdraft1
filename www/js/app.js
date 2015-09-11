// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)

angular.module('reviewBook', ['ionic', 'ngCordova','xeditable','reviewBook.controllers'])

.run(function($ionicPlatform,$cordovaSQLite,DB,editableOptions) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    DB.init();
  });
  editableOptions.theme = 'bs3';
})



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    
    .state('page1', {
      url: '/main',
      templateUrl: 'page1.html'
    })
    .state('start', {
      url: '/start',
      templateUrl: 'start.html'
      //controller: 'ImageController'
    })
    
    .state('page2', {
      url: '/login',
      templateUrl: 'page2.html',
      controller: 'loginCtrl'
    })
    
    .state('page3', {
      url: '/signup',
      templateUrl: 'page3.html'
    })
    .state('Menu', {
      url: '/menu',
      templateUrl: 'menu.html'
    })
    
    
     .state('tab', {
    url: '/tab',
    //abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:
  .state('tab.Messages', {
    url: '/Messages',
    views: {
      'tab-Messages': {
        templateUrl: 'templates/messages.html',
        controller: 'MessageCtrl'
      }
    }
  })
  .state('tab.Reviews', {
    url: '/Reviews',
    views: {
      'tab-Reviews': {
        templateUrl: 'templates/Reviews.html',
        controller: 'ReviewsCtrl'
      }
    }
  })

  .state('tab.Customers', {
      url: '/Customers',
      views: {
        'tab-Customers': {
          templateUrl: 'templates/Customers.html',
          controller: 'CustomersCtrl'
        }
      }
    })

  .state('tab.Reminders', {
      url: '/Reminders',
      views: {
        'tab-Reminders': {
          templateUrl: 'templates/Reminders.html',
          controller: 'remindersCtrl'
        }
      }
    })
  .state('SetReminder', {
      url: '/SetReminder',
          templateUrl: 'templates/SetReminder.html',
          controller: 'setReminderCtrl'
        
      
    })
  .state('Customer-edit', {
    cache: false,
      url: '/edit',
          templateUrl: 'templates/edit.html',
          controller: 'editCtrl'
        
      
    })
  .state('composeMessages', {
      url: '/composeMessages',
          templateUrl: 'templates/compose.html',
          controller: 'MessageCtrl'
        
      
    })




     // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/start');
  

})
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'documents',
            columns: [
               
                {name: 'name', type: 'text'},
                {name: 'email', type: 'text'},
                {name: 'phoneNum', type: 'text'},
                {name: 'release_date', type: 'date'},
                {name: 'stars', type: 'integer'}
            ]
        },
        {
            name: 'reminders',
            columns: [
                {name: 'name', type: 'text'},
                {name: 'phoneNum', type:'text'},
                {name: 'remindDate',type:'date'},
                {name: 'item', type:'text'},
                {name: 'sizech',type: 'text'},
                {name: 'settime', type:'date DEFAULT CURRENT_DATE'}
          ]
        },
        {
            name: 'messages',
            columns: [
                {name: 'title', type: 'text'},
                {name: 'customers', type:'text'},
                {name: 'time',type:'timestamp'},
                {name: 'text', type:'text'},
                {name: 'status',type: 'text'},
          ]
        }
    ]
  })

//.constant('SERVER', {
  // Local server
//  url: 'http://localhost:88'});

  // Public Heroku server
 // url: 'https://ionic-songhop.herokuapp.com'
//});

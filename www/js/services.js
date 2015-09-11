angular.module('reviewBook.services', [])
.factory('FileService', function() {
  var images;
  var IMAGE_STORAGE_KEY = 'images';
 
  function getImages() {
    var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
    if (img) {
      images = JSON.parse(img);
    } else {
      images = [];
    }
    return images;
  };
 
  function addImage(img) {
    images.push(img);
    window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
  };
 
  return {
    storeImage: addImage,
    images: getImages
  }
})
.factory('user', function(){

  var o = {
    customers:[]

  }
  o.addme = function(customer) {
    
    // add to favorites array
    o.customers=[];
    o.customers.push(customer);
    };
  return o;
})
.factory('reciever', function(){

  var r = {
    recievers:[]

  }
  r.clearall = function () {
    for(var i = r.recievers.length - 1; i >= 0; i--)
          {
            r.recievers.splice(i,1);
          }
    };
  r.toggleReciever = function (customer) {
          var count=0;
          for(var i = r.recievers.length - 1; i >= 0; i--)
          {
            if(r.recievers[i].phoneNum == customer.phoneNum){
            r.recievers.splice(i,1);
            count ++;
          }
          }
          if(count==0)
            r.recievers.push(customer);
        
    };
  
  return r;
})
// DB wrapper
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;
 
    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
 
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
 
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
 
            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };
 
    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };
 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        var output = [];
        return result.rows.item(0);
    };
 
    return self;
})
// Resource service example
.factory('Reminders', function(DB) {
    var self = this;
  self.addreminder = function(reminder) {
    var parameters = [reminder.cname,reminder.phoneNum,reminder.remindDate,reminder.item,reminder.sizech];
    return DB.query("INSERT INTO reminders VALUES (?,?,?,?,?,'')", parameters);
  }
 
  self.removereminder= function(reminder) {
    var parameters = [reminder.phoneNum];
    return DB.query("DELETE FROM reminders WHERE phoneNum=(?)", parameters);
     
  }
     self.allreminders= function() {
        return DB.query('SELECT * FROM reminders')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.searchreminder= function(name) {
        return DB.query('SELECT * FROM reminders WHERE name = ?', [name])
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    return self;
})
.factory('Messages', function(DB) {
    var self = this;
  self.addmsg = function(msg) {
    var parameters = [msg.title,msg.customers,msg.time,msg.status,msg.text];
    return DB.query("INSERT INTO messages VALUES (?,?,?,?,?)", parameters);
  }
 
  self.removemsg= function(msg) {
    var parameters = [msg.title];
    return DB.query("DELETE FROM messages WHERE title=(?)", parameters);
     
  }
  self.deleteall= function() {
   
    return DB.query("DELETE FROM messages");
     
  }
     self.allmsg= function() {
        return DB.query('SELECT * FROM messages')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    self.searchmsg= function(status) {
        return DB.query('SELECT * FROM messages WHERE status = ?', [status])
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    return self;
})
.factory('Document', function(DB) {
    var self = this;
  self.add = function(customer) {
    var parameters = [customer.name,customer.email,customer.phoneNum,customer.stars];
            return DB.query("INSERT INTO documents (name, email,phoneNum,stars) VALUES (?,?,?,?)", parameters);
   
  }
 
  self.removecustomer= function(customer) {
    var parameters = [customer.phoneNum];
    return DB.query("DELETE FROM documents WHERE phoneNum = (?)", parameters);
     
  }
     self.all = function() {
        return DB.query('SELECT * FROM documents')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.searchcustomer = function(name) {
        return DB.query('SELECT * FROM documents WHERE name = ?', [name])
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    self.searchphn = function(phoneNum) {
        return DB.query('SELECT * FROM documents WHERE phoneNum = ?', [phoneNum])
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    return self;
})
.factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {
 
  function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
 
  function optionsForType(type) {
    var source;
    switch (type) {
      case 0:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 1:
        source = Camera.PictureSourceType.PHOTOLIBRARY;
        break;
    }
    return {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
  }
 
  function saveMedia(type) {
    return $q(function(resolve, reject) {
      var options = optionsForType(type);
 
      $cordovaCamera.getPicture(options).then(function(imageUrl) {
        var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
        var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
        var newName = makeid() + name;
        $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
          .then(function(info) {
            FileService.storeImage(newName);
            resolve();
          }, function(e) {
            reject();
          });
      });
    })
  }
  return {
    handleMediaDialog: saveMedia
  }
});
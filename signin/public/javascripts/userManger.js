var bcrypt = require('bcrypt-as-promised');
var checkform = require('./checkform');
var _ = require('lodash');
module.exports = function(db) {
   var users = db.collection('users');
   return {
      findUser: function(username, password) {
         return users.findOne({username: username}).then(function (user){
            return user ? bcrypt.compare(password, user.password)
                  .then(function(){
                     return user;
                  }) : Promise.reject('错误的用户名或密码');
         });
      },
      createUser: function(user) {
         return bcrypt.hash(user.password, 5).then(function (hashpwd){
            user.password = hashpwd;
            user.repeat = hashpwd;
            return users.insert(user);
         });
      },
      checkUser: function(user) {
         var err = checkform.getAllError(user);
         return new Promise(function(resolve, reject){
            err ? reject(err) : resolve(user);
         }).then(function() {
            return users.findOne(getUnique(user)).then(function (aUser){
               console.log(aUser);
               return aUser ? Promise.reject(repeatAttr(user, aUser)) : Promise.resolve(user);
            });
         });
      },
      errorMessage: {
         username: {
            error: '用户名已被注册'
         },
         stuID: {
            error: '学号已被注册'
         },
         phone: {
            error: '电话已被注册'
         },
         email: {
            error: '邮箱已被注册'
         }
      }
   }
}

function getUnique (user) {
   return {
      $or: _(user).omit('password').omit('repaet').pairs().map(pair2obj).value()
   }
}
function pair2obj (pair) {
   var obj = {};
   obj[pair[0]] = pair[1];
   return obj;
}

function repeatAttr(user, aUser) {
   var err = {};
   for (var key in user) {
      if (key != 'password' && key != 'repaet') {
         if (user[key] == aUser[key]) {
            err[key] = '已被注册';
            return err;
         }
      }
   }
}

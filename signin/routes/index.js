var express = require('express');
var router = express.Router();
var checkform = require('../public/javascripts/checkform');
var debug = require('debug')('signin:index');

module.exports = function (db) {
   var users = db.collection('users');
   var others = '';   // is visit others' detail

   var userManger = require('../public/javascripts/userManger')(db);

   router.get('/signin', function (req, res) {
      req.session.user ? res.redirect('/?username=' + req.session.user.username) : res.render('signin', {user: {}, err: ''});
   });

   router.post('/signin',function (req,res) {
      userManger.findUser(req.body.username, req.body.password).then(function (aUser){
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
            req.session.user = aUser;
            res.redirect('/?username=' + aUser.username);
         }).catch(function(error) {
            res.render('signin', {user: req.body, error: '错误的用户名或密码'});
         });
   });

   router.get('/regist', function(req, res) {
      req.session.user ? res.redirect('/?username=' + req.session.user.username) : res.render('regist', {user: {}, error: {}});
   });

   router.post('/regist',function(req,res){
      var user = req.body, error = {};
      userManger.checkUser(user).then(function(){
         userManger.createUser(user);
      }).then(function(){
         req.session.user = req.body;
         req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
         res.redirect('/?username=' + user.username);
      }).catch(function (err) {
         console.log(err);
         res.render('regist', {user: user, error: err});
      });
   });

   router.get('/', function(req, res) {
      if (!req.session.user)
         res.redirect('/signin');
      else {
         if (/\/?username=\w+/.test(req.url)) {
            if (req.url.substr(11) == req.session.user.username) {
               var err = '';
               if (others) {
                  err = others;
                  others = '';
               }
               res.render('detail', {user: req.session.user, error: err});
            }
            else {
               others = '只能够访问自己的数据';
               res.redirect('/?username=' + req.session.user.username);
            }
         }
         else res.redirect('/signin');
      }
   });

   router.get('/signout',function(req,res) {
      delete req.session.user;
      res.redirect('/signin');
   });

   router.get('*',function(req,res) {
      res.redirect('/signin');
   });

   return router;
}

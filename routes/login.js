var express = require('express');
//const { response } = require('../app');
var router = express.Router();
const loginHelper=require('../helpers/login-helper')


/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
    res.render('home',{title:'Home Page'})
  }else{
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.render('login', { title:'Login', 'loginErr':req.session.loginErr });
    req.session.loginErr=false
  }
});

//   router.post('/signin',function(req,res){
//   console.log(req.body)
//   res.render('home', { title: 'Home Page' });
//   MongoClient.connect('mongodb://localhost:27017',function(err,client){
//     if(err) 
//    console.log('error')
//    else
//    console.log('hurray')
//    client.db('Sample').collection('user').insertOne(req.body)
//    })
//    res.send('got it')
// })

router.post('/signin',function(req,res){
 loginHelper.doLogin(req.body).then((response)=>{
   // if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.render('home',{title:'Home Page'})
   // }else{
    //  req.session.loginErr="Invalid user name or Password"
    //  res.redirect('/')
      ////res.render('login', { title: 'Login', fail:'Invalid Username or password' });
    //}
  }).catch(()=>{
    req.session.loginErr="Invalid user name or Password"
    res.redirect('/')

  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;

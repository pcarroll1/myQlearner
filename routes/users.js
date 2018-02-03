var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function(req, res) {
  res.render('register');
});

// Login
router.get('/login', function(req, res) {
    res.render('login');
});

// Register User
router.post('/register', function(req, res){
    res.render('register');
});


module.exports = router;

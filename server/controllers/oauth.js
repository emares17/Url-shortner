const User = require('../models/User');
const passport = require('passport');

exports.oAuth = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile'] })(req, res, next);
};

exports.oAuthCallback = (req, res, next) => {
    passport.authenticate('google', (err, user) => {
        if (err) {
          console.error(err);
          return res.redirect('/signup');
        }
    
        if (!user) {
          return res.redirect('/signup');
        }
    
        req.logIn(user, (err) => {
          if (err) {
            console.error(err);
            return res.redirect('/signup');
          }
    
          res.redirect('/');
        });
      })(req, res, next);
}

exports.oAuthLogout = (req, res) => {
  req.logout(err => {
    if (err) {
        return next(err)
    } else {
        res.redirect('/')
    }
  })  
}

exports.oAuthStatus = (req, res, next) => {
  try {
    const status = req.isAuthenticated(); 
    res.json({ status });
  } catch (error) {
    next(error);
  };
}
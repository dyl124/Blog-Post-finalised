const router = require('express').Router();

// Example authentication middleware (withAuth)
const withAuth = (req, res, next) => {
    if (req.session.logged_in) {
    // res.redirect('/blogs'); 
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authenticated, redirect or send an error response
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
module.exports = withAuth;

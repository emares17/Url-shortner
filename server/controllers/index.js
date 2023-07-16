const path = require('path');
const Url = require('../models/Url');
const User = require('../models/User')
const passport = require('passport');
const { RequestError } = require('../middleware/errorHandler');
const { getShortUrls } = require('../utils/utils');

exports.getHome = async(req, res, next) => {
  try {
    let query = {};

    if (req.isAuthenticated()) {
      query = { user: req.user.id };
    }

    const response = await getShortUrls(0, 5, query);

    console.log(response)
    
    res.render('index', { 
      data: response, 
      shortUrl: response.shortUrl, 
      firstName: req.isAuthenticated() ? req.user.firstName : null,
      currentPage: response.currentPage, 
      totalPages: response.totalPages, 
      authenticated: req.isAuthenticated() 
    });
  } catch (error) {
    next(error);
  }
};

exports.loadMore = async(req, res, next) => {
  try {
    const page = req.query.p || 0;
    const limit = 5;
    const authenticated = req.query.authenticated = 'true';

    let query = {};

    if (authenticated) {
      query = { user: req.user.id }
    }

    const response = await getShortUrls(page, limit, query);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.createShortUrl = async(req, res, next) => {
    try {
      const { url } = req.body;
      const user = req.user ? req.user._id : null

      await Url.create({ url, user: user });
      res.redirect('/');
    } catch (error) {
        next(error);
    }
};

exports.getShortUrl = async(req, res, next) => {
    try {
       const short_url = await Url.findOne({ url_shortid: req.params.url_shortid });
       if (short_url == null) {
            return res.status(500).json({ message: "Url not found" })
       }

       short_url.save();
       res.redirect(short_url.url);
    } catch (error) {
        next(error);
    }
};

exports.getSignUp = async(req, res, next) => {
  try {
    res.render('signup');
  } catch (error) {
    next(error)
  }
};
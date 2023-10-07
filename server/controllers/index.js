const path = require('path');
const Url = require('../models/Url');
const User = require('../models/User')
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const { RequestError } = require('../middleware/errorHandler');
const { getShortUrls } = require('../utils/utils');
const { default: mongoose } = require('mongoose');

exports.getHome = async(req, res, next) => {
  try {
    let response;

    if (req.isAuthenticated()) {
      const user = req.user.id;
      response = await getShortUrls(0, 5, user);
    } else {
      guest = 'guest'
      response = await getShortUrls(0, 5, guest);
    }
    
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

exports.loadMore = async (req, res, next) => {
  try {
    const page = req.query.p || 0;
    const limit = 5;
    let user = null;

    if (req.isAuthenticated()) {
      user = req.user.id;
    }

    const response = await getShortUrls(page, limit, user);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    let user = null;

    if (req.isAuthenticated()) {
      user = req.user._id; 
      await Url.create({ url, user: user});
    } else {
      const guestId = new mongoose.Types.ObjectId()
      await Url.create({ url, user: guestId, guest: true});
    }

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
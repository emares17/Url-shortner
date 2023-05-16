const path = require('path');
const Url = require('../models/Url');
const { RequestError } = require('../middleware/errorHandler')

exports.getHome = async (req, res, next) => {
    try {
      const shortUrl = await Url.find(); 
      res.render('index',{ shortUrl: shortUrl });
    } catch (error) {
      next(error);
    }
  };

exports.createShortUrl = async(req, res, next) => {
    try {
        await Url.create({ url: req.body.url });
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
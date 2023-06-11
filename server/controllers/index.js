const path = require('path');
const Url = require('../models/Url');
const { RequestError } = require('../middleware/errorHandler');
const { getShortUrls } = require('../utils/utils');

exports.getHome = async (req, res, next) => {
  try {
    const response = await getShortUrls(0, 5);
    res.render('index', { data: response, shortUrl: response.shortUrl, currentPage: response.currentPage, totalPages: response.totalPages });
  } catch (error) {
    next(error);
  }
};

exports.loadMore = async (req, res, next) => {
  try {
    const page = req.query.p || 0;
    const limit = 5;

    const response = await getShortUrls(page, limit);
    res.json(response);
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
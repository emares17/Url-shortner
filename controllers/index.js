const Url = require('../models/Url');

exports.getHome = async(req, res, next) => {
    try {
        const shortUrl = await Url.find()
        res.render('index', { shortUrl: shortUrl });
    } catch (error) {
        console.error(error);
    }
};

exports.createShortUrl = async(req, res, next) => {
    try {
        await Url.create({ url: req.body.url })
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
}

exports.getShortUrl = async(req, res, next) => {
    try {
       const short_url = await Url.findOne({ url_shortid: req.params.url_shortid })
       console.log('short_url:', short_url);
       if (short_url == null) {
        return res.sendStatus(404)
       }

       short_url.save()
       console.log('redirecting to:', short_url.url);
       res.redirect(short_url.url)
    } catch (error) {
        console.error(error)
    }
}
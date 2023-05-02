const Url = require('../models/Url');

exports.getHome = async(req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error(error);
    }
};


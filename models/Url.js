const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    url_shortid: {
        type: String,
        required: true
    }
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;
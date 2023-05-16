const mongoose = require('mongoose');
const shortId = require('shortid');

const UrlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    url_shortid: {
        type: String,
        required: true,
        default: shortId.generate
    },
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;
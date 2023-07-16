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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;
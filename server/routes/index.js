const express = require('express');
const router = express.Router();
const { getHome, loadMore, createShortUrl, getShortUrl, getSignUp } = require('../controllers');

router.get('/', getHome);
router.get('/load-more', loadMore);
router.get('/signup', getSignUp);
router.get('/:url_shortid', getShortUrl);
router.post('/', createShortUrl);


module.exports = router;


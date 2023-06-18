const express = require('express');
const { getHome, loadMore, createShortUrl, getShortUrl, getSignUp } = require('../controllers');
const router = express.Router();

router.get('/', getHome);
router.get('/load-more', loadMore);
router.get('/signup', getSignUp);
router.post('/', createShortUrl);
router.get('/:url_shortid', getShortUrl);


module.exports = router;


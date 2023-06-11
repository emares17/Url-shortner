const express = require('express');
const { getHome, loadMore, createShortUrl, getShortUrl } = require('../controllers');
const router = express.Router();

router.get('/', getHome);
router.get('/load-more', loadMore);
router.post('/', createShortUrl);
router.get('/:url_shortid', getShortUrl);

module.exports = router;


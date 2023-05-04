const express = require('express');
const { getHome, createShortUrl, getShortUrl } = require('../controllers');
const router = express.Router();

router.get('/', getHome);
router.post('/', createShortUrl);
router.get('/:url_shortid', getShortUrl);

module.exports = router;


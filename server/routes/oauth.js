const express = require('express');
const router = express.Router();
const { oAuth, oAuthCallback, oAuthLogout, oAuthStatus } = require('../controllers/oauth');

router.get('/google', oAuth);
router.get('/google/callback', oAuthCallback);
router.get('/logout', oAuthLogout);
router.get('/status', oAuthStatus);

module.exports = router;


const express = require('express');
const router = expressRouter();

router.use('/api', require('./api'));

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/trip-health-check', (req, res) => {
    res.status(200).json({
        message: "Trip API Endpoint active"
    })
});

module.exports = router;
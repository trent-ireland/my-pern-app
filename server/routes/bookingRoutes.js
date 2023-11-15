const express = require('express');
const { createBookingHandler, cancelBookingHandler } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', createBookingHandler);
router.delete('/:bookingId', cancelBookingHandler);

module.exports = router;

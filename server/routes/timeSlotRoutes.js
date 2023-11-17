const express = require('express');
const router = express.Router();
const timeslotController = require('../controllers/timeSlotController');

router.get('/', timeslotController.getTimeslots);

module.exports = router;

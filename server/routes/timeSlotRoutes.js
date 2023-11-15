const express = require('express');
const timeSlotController = require('../controllers/timeSlotController');
const router = express.Router();

router.get('/', timeSlotController.getAllTimeSlots);
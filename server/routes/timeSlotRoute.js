const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeSlotController');

// Route to get all time slots
router.get('/timeslots', timeSlotController.getAllTimeSlots);

// Route to create a new time slot
router.post('/timeslots', timeSlotController.createTimeSlot);

// Route to update an existing time slot
router.put('/timeslots/:id', timeSlotController.updateTimeSlot);

// Route to delete time slots by date
router.delete('/timeslots/date/:date', timeSlotController.deleteTimeSlotsByDate);

// Route to delete time slots by neighborhood
router.delete('/timeslots/neighborhood/:neighborhoodName', timeSlotController.deleteTimeSlotsByNeighborhood);

module.exports = router;

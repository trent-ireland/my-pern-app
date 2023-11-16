const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Public Endpoints

// List Available Services
router.get('/services', controller.listServices);

// List Available Time Slots
router.get('/timeslots', controller.listTimeSlots);

// Create a Booking
router.post('/bookings', controller.createBooking);

// Admin Endpoints

// Admin Login
router.post('/admin/login', controller.adminLogin);

// Add a Neighborhood
router.post('/admin/neighborhoods', controller.addNeighborhood);

// Update a Neighborhood
router.put('/admin/neighborhoods/:id', controller.updateNeighborhood);

// Delete a Neighborhood
router.delete('/admin/neighborhoods/:id', controller.deleteNeighborhood);

// Add a Time Slot
router.post('/admin/timeslots', controller.addTimeSlot);

// Update a Time Slot
router.put('/admin/timeslots/:id', controller.updateTimeSlot);

// Delete a Time Slot
router.delete('/admin/timeslots/:id', controller.deleteTimeSlot);

// View All Bookings
router.get('/admin/bookings', controller.viewAllBookings);

// Update a Booking Status
router.put('/admin/bookings/:id/status', controller.updateBookingStatus);

// Additional Admin Endpoints for Managing Services

// Add a Service
router.post('/admin/services', controller.addService);

// Update a Service
router.put('/admin/services/:id', controller.updateService);

// Delete a Service
router.delete('/admin/services/:id', controller.deleteService);

// Booking Management Endpoints

// Cancel a Booking
router.delete('/bookings/:id', controller.cancelBooking);

// Retrieve a User's Bookings
router.get('/bookings/user/:userId', controller.retrieveUserBookings);

module.exports = router;

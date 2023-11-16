const express = require('express');
const router = express.Router();
const models = require('../models/model');
const { validationResult, body, param } = require('express-validator');

// Middleware for handling validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Public Endpoints

// List Available Services
router.get('/services', async (req, res) => {
  try {
    const services = await models.getServices();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List Available Time Slots
router.get('/timeslots', async (req, res) => {
  const { date, neighborhoodId } = req.query;

  try {
    const timeSlots = await models.getTimeSlots(date, neighborhoodId);
    res.status(200).json(timeSlots);
  } catch (error) {
    console.error('Error getting time slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a Booking
router.post(
  '/bookings',
  [
    body('firstname').notEmpty(),
    body('lastname').notEmpty(),
    body('email').isEmail(),
    body('phone_number').notEmpty(),
    body('address').notEmpty(),
    body('zipcode').notEmpty(),
    body('timeslot_id').notEmpty().isInt(),
    body('service_ids').isArray(),
  ],
  validate,
  async (req, res) => {
    const bookingData = req.body;

    try {
      const bookingId = await models.createBooking(bookingData);
      res.status(201).json({ bookingId });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Admin Endpoints

// Admin Login
router.post(
  '/admin/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty(),
  ],
  validate,
  async (req, res) => {
    const { username, password } = req.body;

    try {
      const admin = await models.adminLogin(username, password);
      if (admin) {
        res.status(200).json(admin);
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error logging in as admin:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Add a Neighborhood
router.post(
  '/admin/neighborhoods',
  [
    body('name').notEmpty(),
  ],
  validate,
  async (req, res) => {
    const { name } = req.body;

    try {
      const neighborhood = await models.addNeighborhood(name);
      res.status(201).json(neighborhood);
    } catch (error) {
      console.error('Error adding neighborhood:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Update a Neighborhood
router.put(
  '/admin/neighborhoods/:id',
  [
    param('id').isInt(),
    body('name').notEmpty(),
  ],
  validate,
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const neighborhood = await models.updateNeighborhood(id, name);
      res.status(200).json(neighborhood);
    } catch (error) {
      console.error('Error updating neighborhood:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Delete a Neighborhood
router.delete(
  '/admin/neighborhoods/:id',
  [
    param('id').isInt(),
  ],
  validate,
  async (req, res) => {
    const { id } = req.params;

    try {
      await models.deleteNeighborhood(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting neighborhood:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Add a Time Slot
router.post(
  '/admin/timeslots',
  [
    body('neighborhoodId').notEmpty().isInt(),
    body('date').isDate(),
  ],
  validate,
  async (req, res) => {
    const { neighborhoodId, date } = req.body;

    try {
      const timeSlot = await models.addTimeSlot(neighborhoodId, date);
      res.status(201).json(timeSlot);
    } catch (error) {
      console.error('Error adding time slot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Update a Time Slot
router.put(
  '/admin/timeslots/:id',
  [
    param('id').isInt(),
    body('neighborhoodId').notEmpty().isInt(),
    body('date').isDate(),
  ],
  validate,
  async (req, res) => {
    const { id } = req.params;
    const { neighborhoodId, date } = req.body;

    try {
      const timeSlot = await models.updateTimeSlot(id, neighborhoodId, date);
      res.status(200).json(timeSlot);
    } catch (error) {
      console.error('Error updating time slot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Delete a Time Slot
router.delete(
  '/admin/timeslots/:id',
  [
    param('id').isInt(),
  ],
  validate,
  async (req, res) => {
    const { id } = req.params;

    try {
      await models.deleteTimeSlot(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting time slot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// View All Bookings
router.get('/admin/bookings', async (req, res) => {
  try {
    // Add code to retrieve bookings with optional filters here
    const bookings = await models.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a Booking Status
router.put(
  '/admin/bookings/:id/status',
  [
    param('id').isInt(),
    body('status').isIn(['confirmed', 'completed', 'canceled']),
  ],
  validate,
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const booking = await models.updateBookingStatus(id, status);
      if (!booking) {
        res.status(404).json({ error: 'Booking not found' });
      } else {
        res.status(200).json(booking);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

module.exports = router;

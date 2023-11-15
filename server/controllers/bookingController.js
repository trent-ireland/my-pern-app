const { createBooking } = require('../models/booking');

const createBookingHandler = async (req, res) => {
  try {
    const newBooking = await createBooking(req.body);
    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const { cancelBooking } = require('../models/booking');

const cancelBookingHandler = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deletedBooking = await cancelBooking(bookingId);
    if (deletedBooking) {
      res.status(200).json({ message: 'Booking cancelled successfully', booking: deletedBooking });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createBookingHandler,
  cancelBookingHandler,
};

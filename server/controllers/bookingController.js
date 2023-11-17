const Booking = require('../model/booking');

exports.createBooking = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address, zipCode, timeslotId, serviceId } = req.body;
    const newBooking = await Booking.create({ firstName, lastName, email, phoneNumber, address, zipCode, timeslotId, serviceId });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

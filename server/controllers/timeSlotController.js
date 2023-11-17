const Timeslot = require('../model/timeslot');

exports.getTimeslots = async (req, res) => {
  try {
    const timeslots = await Timeslot.getAll();
    res.status(200).json(timeslots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

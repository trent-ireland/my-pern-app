const { getAvailableTimeSlots } = require('../models/timeSlotModel'); 

exports.getTimeSlots = async (req, res) => {
    // Extract filter options from request query parameters
    const filters = {
        date: req.query.date,
        neighborhoodId: req.query.neighborhoodId
    };

    try {
        // Retrieve available time slots with the given filters
        const timeSlots = await getAvailableTimeSlots(filters);
        // Send the retrieved time slots in the response with a 200 OK status
        res.status(200).json(timeSlots);
    } catch (err) {
        // If an error occurs, send a 500 Internal Server Error status with the error message
        res.status(500).json({ message: 'Error fetching available time slots', error: err.message });
    }
};

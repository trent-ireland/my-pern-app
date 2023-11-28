const timeSlotModel = require('../model/timeSlotModel'); 

const timeSlotController = {
    getAllTimeSlots: async (req, res) => {
        try {
            const { neighborhoodName, date } = req.query;
            const timeSlots = await timeSlotModel.getAllTimeSlots(neighborhoodName, date);
            res.json(timeSlots);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    createTimeSlot: async (req, res) => {
        try {
            const { neighborhoodName, date, time_window, availability_limit } = req.body;
            const newTimeSlot = await timeSlotModel.createTimeSlot(neighborhoodName, date, time_window, availability_limit);
            res.status(201).json(newTimeSlot);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    updateTimeSlot: async (req, res) => {
        try {
            const { id } = req.params;
            const { neighborhoodName, date, time_window, availability_limit } = req.body;
            const updatedTimeSlot = await timeSlotModel.updateTimeSlot(id, neighborhoodName, date, time_window, availability_limit);
            if (updatedTimeSlot) {
                res.json(updatedTimeSlot);
            } else {
                res.status(404).send({ message: 'Time slot not found' });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    deleteTimeSlotsByDate: async (req, res) => {
        try {
            const { date } = req.params; // Assuming the date is passed as a URL parameter
            const count = await timeSlotModel.deleteTimeSlotsByDate(date);
            if (count > 0) {
                res.json({ message: `Successfully deleted ${count} time slots for date ${date}` });
            } else {
                res.status(404).send({ message: 'No time slots found for this date' });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    deleteTimeSlotsByNeighborhood: async (req, res) => {
        try {
            const { neighborhoodName } = req.params; // Assuming the neighborhood name is passed as a URL parameter
            const count = await timeSlotModel.deleteTimeSlotsByNeighborhood(neighborhoodName);
            if (count > 0) {
                res.json({ message: `Successfully deleted ${count} time slots in neighborhood ${neighborhoodName}` });
            } else {
                res.status(404).send({ message: 'No time slots found for this neighborhood' });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
};

module.exports = timeSlotController;

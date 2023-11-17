
const express = require('express');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const timeslotRoutes = require('./routes/timeSlotRoutes');
const neighborhoodRoutes = require('./routes/neighborhoodRoutes');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies



// Service routes
app.use('/services', serviceRoutes);

// Booking routes (as defined in a previous example)
app.use('/bookings', bookingRoutes);

// Timeslot routes
app.use('/timeslots', timeslotRoutes);

app.use('/neighborhoods', neighborhoodRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const path = require('path'); // Add this line to use the path module
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const neighborhoodRoute = require('./routes/neighborhoodRoute');
const timeSlotRoute = require('./routes/timeSlotRoute');

app.use(express.json());
app.use(morgan('dev'));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build'))); // Adjust the path as necessary

app.use('/neighborhoods', neighborhoodRoute);
app.use('/timeslots', timeSlotRoute);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html')); // Adjust the path as necessary
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

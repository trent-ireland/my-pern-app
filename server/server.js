const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const neighborhoodRoute = require('./routes/neighborhoodRoute');
const timeSlotRoute = require('./routes/timeSlotRoute');

app.use(express.json());

app.use(morgan('dev'));



app.use('/neighborhoods', neighborhoodRoute);
app.use('/timeslots', timeSlotRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

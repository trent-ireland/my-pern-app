const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const neighborhoodRoute = require('./routes/neighborhoodRoute');

app.use(express.json());

// Use the neighborhoodRoutes for any requests to "/neighborhoods"
app.use('/neighborhoods', neighborhoodRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

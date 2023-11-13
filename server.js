require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// Security Enhancements
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors()); // Enable CORS for all routes

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body Parsing Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World with enhanced security!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Import route handlers
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const timeSlotRoutes = require('./routes/timeSlotRoutes');
const neighborhoodRoutes = require('./routes/neighborhoodRoutes'); // Import neighborhood routes
const adminRoutes = require('./routes/adminRoutes');
const app = express();


// Security Enhancements
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'http://localhost:3000'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 15552000, // 180 days in seconds
  }
}));
app.disable('x-powered-by');

// CORS configuration for local development
const corsOptions = {
  origin: 'http://localhost:3000', // Your front-end application's local address
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Important for cookies, authorization headers with HTTPS
  optionsSuccessStatus: 204 // Some legacy browsers choke on status 204
};

app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body Parsing Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Mounting routes
app.use('/bookings', bookingRoutes);
app.use('/services', serviceRoutes);
app.use('/timeslots', timeSlotRoutes);
app.use('/admin/neighborhoods', neighborhoodRoutes); // Mount neighborhood routes under the admin path
app.use('/admin', adminRoutes);
// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World with enhanced security!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server startup logic
if (require.main === module) {
  // Only start the server if the file is run directly from Node, which won't be the case in test environment
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

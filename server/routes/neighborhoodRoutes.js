const express = require('express');
const router = express.Router();
const { addNeighborhood, updateNeighborhood, deleteNeighborhood } = require('../controllers/neighborhoodController');
const { authenticateAdmin} = require('../controllers/adminController'); // Make sure to have this middleware defined

// Middleware to check if the user is an admin
router.use(authenticateAdmin);

// Endpoint for adding a new neighborhood
router.post('/', addNeighborhood);

// Endpoint for updating an existing neighborhood
router.put('/:id', updateNeighborhood);

// Endpoint for deleting an existing neighborhood
router.delete('/:id', deleteNeighborhood);

module.exports = router;

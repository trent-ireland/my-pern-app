const express = require('express');
const router = express.Router();
const neighborhoodController = require('../controllers/neighborhoodController');

router.get('/neighborhoods', neighborhoodController.getAllNeighborhoods);
router.post('/neighborhoods', neighborhoodController.createNeighborhood);

module.exports = router;
const express = require('express');
const router = express.Router();
const neighborhoodController = require('../controllers/neighborhoodController');

router.get('/', neighborhoodController.getAllNeighborhoods);
router.post('/', neighborhoodController.createNeighborhood);

module.exports = router;
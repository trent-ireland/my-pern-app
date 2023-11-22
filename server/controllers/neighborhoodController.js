const neighborhoodModel = require('../model/neighborhoodModel');

const neighborhoodController = {
    getAllNeighborhoods: async (req, res) => {
      try {
        const neighborhoods = await neighborhoodModel.getAllNeighborhoods();
        res.json(neighborhoods);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    createNeighborhood: async (req, res) => {
      const { name } = req.body;
  
      try {
        if (!name) {
          return res.status(400).json({ error: 'Name is required' });
        }
  
        const createdNeighborhood = await neighborhoodModel.createNeighborhood(name);
        res.status(201).json(createdNeighborhood);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  };
  
  module.exports = neighborhoodController;

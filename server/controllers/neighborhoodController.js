const neighborhoodModel = require('../models/neighborhood');

exports.addNeighborhood = async (req, res) => {
  try {
    const { name } = req.body;
    const newNeighborhood = await neighborhoodModel.addNeighborhood(name);
    res.status(201).json(newNeighborhood);
  } catch (error) {
    res.status(500).json({ message: 'Error adding neighborhood', error: error.message });
  }
};

exports.updateNeighborhood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedNeighborhood = await neighborhoodModel.updateNeighborhood(id, name);
    if(updatedNeighborhood) {
      res.status(200).json(updatedNeighborhood);
    } else {
      res.status(404).json({ message: 'Neighborhood not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating neighborhood', error: error.message });
  }
  exports.deleteNeighborhood = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedNeighborhood = await neighborhoodModel.deleteNeighborhood(id);
      if (deletedNeighborhood) {
        res.status(200).json({ message: 'Neighborhood deleted successfully', deletedNeighborhood });
      } else {
        res.status(404).json({ message: 'Neighborhood not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting neighborhood', error: error.message });
    }
}
};

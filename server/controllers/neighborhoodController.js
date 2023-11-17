const Neighborhood = require('../model/neighborhood');


exports.getNeighborhoods = async (req, res) => {
  try {
    const neighborhoods = await Neighborhood.getAll();
    res.status(200).json(neighborhoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

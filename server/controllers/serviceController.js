const serviceModel = require('../models/service');

exports.listAllServices = async (req, res) => {
  try {
    const services = await serviceModel.getServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

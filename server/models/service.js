const pool = require('../config/db'); 

const getServices = async () => {
  try {
    const query = 'SELECT * FROM Services ORDER BY ServiceID;';
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getServices,
};

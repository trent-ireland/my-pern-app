const pool = require('../config/db');

const Neighborhood = {
  async getAll() {
    const result = await pool.query("SELECT * FROM neighborhoods");
    return result.rows;
  },
};

module.exports = Neighborhood;
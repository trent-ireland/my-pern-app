// models/service.js
const pool = require('../config/db'); 
class Service {
  static async getAll() {
    const result = await pool.query('SELECT * FROM services');
    return result.rows;
  }
}

module.exports = Service;

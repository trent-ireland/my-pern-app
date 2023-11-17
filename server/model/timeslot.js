const pool = require('../config/db'); // Ensure you have a db.js file that sets up your database connection pool

class Timeslot {
  static async getAll() {
    const result = await pool.query('SELECT * FROM timeslots WHERE booked = FALSE'); // Assuming there is a 'booked' column to indicate availability
    return result.rows;
  }
}

module.exports = Timeslot;

const pool = require('../config/db'); 
class Booking {
  static async create({ firstName, lastName, email, phoneNumber, address, zipCode, timeslotId, serviceId }) {
    // Insert the new booking into the database
    const newBooking = await pool.query(
      'INSERT INTO bookings (firstname, lastname, email, phonenumber, address, zipcode, timeslotid, serviceid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [firstName, lastName, email, phoneNumber, address, zipCode, timeslotId, serviceId]
    );
    return newBooking.rows[0];
  }
}

module.exports = Booking;

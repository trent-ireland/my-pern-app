const pool = require('../config/db'); 

const createBooking = async (bookingDetails) => {
  const { firstName, lastName, email, phoneNumber, address, zipCode, timeSlotId, serviceId } = bookingDetails;
  const query = `
    INSERT INTO Bookings (
      FirstName, LastName, Email, PhoneNumber, Address, ZipCode, TimeSlotID, ServiceID, Status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Pending')
    RETURNING *;
  `;
  const values = [firstName, lastName, email, phoneNumber, address, zipCode, timeSlotId, serviceId];
  
  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

const cancelBooking = async (bookingId) => {
    const query = 'DELETE FROM Bookings WHERE BookingID = $1 RETURNING *;';
    const values = [bookingId];
    
    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  };

module.exports = {
  createBooking,
  cancelBooking,
};

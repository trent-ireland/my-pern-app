const pool = require('..config/db');

const getAvailableTimeSlots = async (filters) => {
  let query = 'SELECT * FROM TimeSlots';
  const values = [];
  const conditions = [];

  // Apply filters if any (for example, by neighborhood or date)
  if (filters.date) {
    values.push(filters.date);
    conditions.push(`Date = $${values.length}`);
  }
  if (filters.neighborhoodId) {
    values.push(filters.neighborhoodId);
    conditions.push(`NeighborhoodID = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  try {
    const res = await pool.query(query, values);
    return res.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAvailableTimeSlots,
};

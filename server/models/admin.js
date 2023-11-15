const pool = require('../config/db');
const bcrypt = require('bcrypt');

const authenticateAdmin = async (email, password) => {
  const query = 'SELECT * FROM Admins WHERE Email = $1';
  const values = [email];

  try {
    const res = await pool.query(query, values);
    const admin = res.rows[0];
    if (admin && await bcrypt.compare(password, admin.Password)) {
      return admin;
    }
    return null;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  authenticateAdmin,
};

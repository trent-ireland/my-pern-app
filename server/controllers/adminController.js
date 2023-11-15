const { authenticateAdmin } = require('../models/admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await authenticateAdmin(email, password);
    if (admin) {
      // Create a token
      const token = jwt.sign(
        { adminId: admin.AdminID, email: admin.Email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Respond with admin details and token
      res.status(200).json({
        message: 'Authentication successful',
        admin: {
          adminId: admin.AdminID,
          email: admin.Email,
          name: admin.Name
        },
        token
      });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

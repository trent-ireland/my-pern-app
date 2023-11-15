const pool = require('../config/db'); 

const addNeighborhood = async (name) => {
  const query = 'INSERT INTO Neighborhoods (Name) VALUES ($1) RETURNING *;';
  const values = [name];
  const res = await pool.query(query, values);
  return res.rows[0];
};

const updateNeighborhood = async (id, name) => {
  const query = 'UPDATE Neighborhoods SET Name = $1 WHERE NeighborhoodID = $2 RETURNING *;';
  const values = [name, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};
const deleteNeighborhood = async (id) => {
    const query = 'DELETE FROM Neighborhoods WHERE NeighborhoodID = $1 RETURNING *;';
    const values = [id];
    const res = await pool.query(query, values);
    return res.rowCount ? res.rows[0] : null;
  };

module.exports = {
  addNeighborhood,
  updateNeighborhood,
  deleteNeighborhood,
};

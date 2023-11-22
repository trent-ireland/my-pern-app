const pool = require('../config/db');

const neighborhoodModel = {
    async getAllNeighborhoods() {
        const result = await pool.query('SELECT * FROM neighborhoods');
        return result.rows;
    },

    async createNeighborhood(name) {
        const result = await pool.query('INSERT INTO neighborhoods (name) VALUES ($1) RETURNING *', [name]);
        return result.rows[0];
    }
};

module.exports = neighborhoodModel;

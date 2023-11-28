const pool = require('../config/db');

const neighborhoodModel = {
    // Method to get all neighborhoods from the database.
    async getAllNeighborhoods() {
        // Querying the database to select all records from the 'neighborhoods' table.
        const result = await pool.query('SELECT * FROM neighborhoods');
        // Returning the rows (data) from the query result.
        return result.rows;
    },

    // Method to create a new neighborhood in the database.
    async createNeighborhood(name) {
        // Inserting a new record into the 'neighborhoods' table with the provided name and returning the newly created record.
        const result = await pool.query('INSERT INTO neighborhoods (name) VALUES ($1) RETURNING *', [name]);
        // Returning the first row (the newly created neighborhood) from the query result.
        return result.rows[0];
    }
};

// Exporting the neighborhoodModel object to be used in other parts of the application.
module.exports = neighborhoodModel;
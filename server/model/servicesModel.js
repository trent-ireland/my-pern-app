const pool = require("../config/db");


const servicesModel = {
    // Method to get all neighborhoods from the database.
    async getAllservices() {
        // Querying the database to select all records from the 'services' table.
        const result = await pool.query('SELECT * FROM services');
        // Returning the rows (data) from the query result.
        return result.rows;
    },

    // Method to create a new neighborhood in the database.
    async createService(name) {
        // Inserting a new record into the 'neighborhoods' table with the provided name and returning the newly created record.
        const result = await pool.query('INSERT INTO service (name) VALUES ($1) RETURNING *', [name]);
        // Returning the first row (the newly created neighborhood) from the query result.
        return result.rows[0];
    }
};

module.exports = servicesModel;
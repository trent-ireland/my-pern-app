const pool = require('../config/db');

cconst timeSlotModel = {
    // Asynchronous function to retrieve all time slots, optionally filtered by neighborhood name and/or date.
    async getAllTimeSlots(neighborhoodName, date) {
        // Base SQL query to join timeslots and neighborhoods tables.
        let baseQuery = `
            SELECT ts.*, n.name as neighborhood_name   
            FROM timeslots ts   
            JOIN neighborhoods n ON ts.neighborhood_id = n.id
        `;
        const params = []; // Array to store query parameters.
        const conditions = []; // Array to store query conditions.

        // Conditionally add neighborhood name filter.
        if (neighborhoodName) {
            params.push(`%${neighborhoodName}%`); // Add neighborhood name to parameters.
            conditions.push(`n.name ILIKE $${params.length}`); // Add ILIKE condition for case-insensitive matching.
        }

        // Conditionally add date filter.
        if (date) {
            params.push(date); // Add date to parameters.
            conditions.push(`ts.date = $${params.length}`); // Add condition for matching the date.
        }

        // Append conditions to the base query if any exist.
        if (conditions.length > 0) {
            baseQuery += ' WHERE ' + conditions.join(' AND ');  
        }

        // Execute the query with parameters and return the rows.
        const result = await pool.query(baseQuery, params);
        return result.rows;
    },

    // Asynchronous function to create a new time slot.
    async createTimeSlot(neighborhoodName, date, time_window, availability_limit) {
        // Query to find the neighborhood ID based on its name.
        const neighborhoodResult = await pool.query(
            'SELECT id FROM neighborhoods WHERE name = $1',
            [neighborhoodName]
        );

        // Throw an error if the neighborhood is not found.
        if (neighborhoodResult.rowCount === 0) {
            throw new Error('Neighborhood not found');
        }
        const neighborhood_id = neighborhoodResult.rows[0].id; // Extract the neighborhood ID.

        // Split the time window into start and end times.
        const [startTime, endTime] = time_window.split('-');
        
        // Create a time range value using the date and time window.
        const tsrangeValue = `['${date} ${startTime}', '${date} ${endTime}']`;

        // Insert the new time slot into the database and return the created record.
        const result = await pool.query(
            'INSERT INTO timeslots (neighborhood_id, date, time_window, availability_limit) VALUES ($1, $2, $3::tsrange, $4) RETURNING *',
            [neighborhood_id, date, tsrangeValue, availability_limit]
        );
        return result.rows[0];
    },

    // Asynchronous function to update an existing time slot.
    async updateTimeSlot(id, neighborhoodName, date, time_window, availability_limit) {
        // Query to find the neighborhood ID based on its name.
        const neighborhoodResult = await pool.query(
            'SELECT id FROM neighborhoods WHERE name = $1',
            [neighborhoodName]
        );

        // Throw an error if the neighborhood is not found.
        if (neighborhoodResult.rowCount === 0) {
            throw new Error('Neighborhood not found');
        }
        const neighborhood_id = neighborhoodResult.rows[0].id; // Extract the neighborhood ID.

        // Split the time window into start and end times.
        const [startTime, endTime] = time_window.split('-');
        
        // Create a time range value using the date and time window.
        const tsrangeValue = `['${date} ${startTime}', '${date} ${endTime}']`;

        // Update the specified time slot and return the updated record.
        const result = await pool.query(
            'UPDATE timeslots SET neighborhood_id = $1, date = $2, time_window = $3::tsrange, availability_limit = $4 WHERE id = $5 RETURNING *',
            [neighborhood_id, date, tsrangeValue, availability_limit, id]
        );
        return result.rows[0];
    },

    // Asynchronous function to delete time slots by a specific date.
    async deleteTimeSlotsByDate(date) {
        // Delete time slots for the given date and return the count of rows deleted.
        const result = await pool.query(
            'DELETE FROM timeslots WHERE date = $1 RETURNING *',
            [date]
        );

        return result.rowCount;
    },

    // Asynchronous function to delete time slots by neighborhood.
    async deleteTimeSlotsByNeighborhood(neighborhoodName) {
        // Query to find the neighborhood ID based on its name.
        const neighborhoodResult = await pool.query(
            'SELECT id FROM neighborhoods WHERE name = $1',
            [neighborhoodName]
        );

        // Throw an error if the neighborhood is not found.
        if (neighborhoodResult.rowCount === 0) {
            throw new Error('Neighborhood not found');
        }

        const neighborhood_id = neighborhoodResult.rows[0].id; // Extract the neighborhood ID.

        // Delete time slots for the given neighborhood and return the count of rows deleted.
        const result = await pool.query(
            'DELETE FROM timeslots WHERE neighborhood_id = $1 RETURNING *',
            [neighborhood_id]
        );

        return result.rowCount;
    }
};

// Export the timeSlotModel object for use in other parts of the application.
module.exports = timeSlotModel;
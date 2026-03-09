import { pool } from '../config/database.js';

const EventsController = {
  getEvents: async () => {
    try {
      const result = await pool.query('SELECT * FROM events ORDER BY id;');
      return result.rows;
    } catch (err) {
      console.error('Error fetching events:', err);
      throw err;
    }
  },
  getEventById: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM events WHERE id = $1;', [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error fetching event by ID:', err);
      throw err;
    }
  }
};

export default EventsController;
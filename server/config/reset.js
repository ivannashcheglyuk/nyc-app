// server/config/reset.js
import 'dotenv/config';
import { pool } from './database.js';
import { eventData } from '../data/events.js';

// Create events table
async function createEventsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date VARCHAR(50) NOT NULL,
        time VARCHAR(50) NOT NULL,
        venue VARCHAR(255) NOT NULL,
        genre VARCHAR(100),
        ticketprice VARCHAR(50),
        image TEXT,
        description TEXT
      );
    `);
    console.log('✅ events table created or already exists');
  } catch (err) {
    console.error('⚠️ error creating events table', err);
  }
}

// Insert initial event data
async function seedEventsTable() {
  try {
    // Delete old rows first to avoid duplicates
    await pool.query('DELETE FROM events;');
    console.log('🗑️ Old events deleted');

    for (let event of eventData) {
      await pool.query(
        `INSERT INTO events (name, date, time, venue, genre, ticketprice, image, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [
          event.name,
          event.date,
          event.time,
          event.venue,
          event.genre,
          event.ticketPrice,
          event.image,
          event.description
        ]
      );
      console.log(`Inserted: ${event.name}`);
    }
  } catch (err) {
    console.error('⚠️ error inserting events', err);
  }
}

// Run both functions
(async function resetDB() {
  await createEventsTable();
  await seedEventsTable();
  console.log('🎉 Database reset complete!');
  await pool.end();
})();
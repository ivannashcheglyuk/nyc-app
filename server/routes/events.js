// server/routes/events.js
import express from 'express';
import { pool } from '../config/database.js'; // your DB connection

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events ORDER BY id;'); // <-- your events table
        res.json(result.rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET single event by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM events WHERE id = $1;', [id]);
        if (!result.rows[0]) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

export default router;

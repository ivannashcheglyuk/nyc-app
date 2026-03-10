import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import eventRoutes from './routes/events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Serve static files
app.use(express.static(path.join(__dirname, '../client/public')));

// API route for events
app.use('/api/events', eventRoutes);

// Default route: index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client/public/notFound.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
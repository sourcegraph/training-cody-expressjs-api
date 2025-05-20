const express = require('express');

// Import routes
const apiRoutes = require('./routes/api');

const app = express();

// API routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Pet API. Use /api/pets/random or /api/pets/random/:count endpoints.' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});

module.exports = app;
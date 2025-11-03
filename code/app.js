const express = require('express');
const logger = require('./middleware/logger');
const authToken = require('./middleware/authToken');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Apply logging middleware globally to all routes
app.use(logger);

// Routes

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Server is running',
    message: 'Welcome to Middleware Demo Server'
  });
});

// Public route - accessible without authentication
app.get('/public', (req, res) => {
  res.status(200).json({
    message: 'This is a public route, accessible to everyone',
    endpoint: '/public',
    requiresAuth: false
  });
});

// Protected route - requires Bearer token authentication
app.get('/protected', authToken, (req, res) => {
  res.status(200).json({
    message: 'This is a protected route, accessed with valid Bearer token',
    endpoint: '/protected',
    requiresAuth: true,
    token: req.token
  });
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`========================================\n`);
  console.log('Available routes:');
  console.log(`  GET  /                 - Health check`);
  console.log(`  GET  /public           - Public route (no authentication)`);
  console.log(`  GET  /protected        - Protected route (requires Bearer token: mysecrettoken)`);
  console.log(`\n========================================\n`);
});

module.exports = app;

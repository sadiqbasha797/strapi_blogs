require('dotenv').config();

const express = require('express');
const strapiRoutes = require('./routes/strapiRoutes');

// Add this debug line
console.log('Starting server with config:', {
  PORT: process.env.PORT,
  STRAPI_URL: process.env.STRAPI_URL
});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', strapiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

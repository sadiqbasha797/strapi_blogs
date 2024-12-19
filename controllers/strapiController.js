const axios = require('axios');

// Add this debug line at the top
console.log('Environment variables:', {
  STRAPI_URL: process.env.STRAPI_URL,
  TOKEN_EXISTS: !!process.env.STRAPI_TOKEN
});

// Check if required environment variables are present
if (!process.env.STRAPI_URL) {
  throw new Error('STRAPI_URL is not defined in environment variables');
}

if (!process.env.STRAPI_TOKEN) {
  throw new Error('STRAPI_TOKEN is not defined in environment variables');
}

// Configure axios with base URL and headers
const strapiAPI = axios.create({
  baseURL: `${process.env.STRAPI_URL}/api`,
  headers: {
    'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Controller methods
const strapiController = {
  // Get all tests
  getAllTests: async (req, res) => {
    try {
      const fullUrl = `${process.env.STRAPI_URL}/api/tests`;
      console.log('Attempting to fetch from:', fullUrl);
      
      const response = await strapiAPI.get('/tests');
      res.json(response.data);
    } catch (error) {
      console.error('Error:', {
        message: error.message,
        url: error.config?.url,
        baseURL: strapiAPI.defaults.baseURL
      });
      
      res.status(500).json({ 
        error: error.message,
        details: error.response?.data 
      });
    }
  },

  // Get single test by ID
  getTestById: async (req, res) => {
    try {
      const response = await strapiAPI.get(`/tests/${req.params.id}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new test
  createTest: async (req, res) => {
    try {
      const response = await strapiAPI.post('/tests', {
        data: req.body
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update test
  updateTest: async (req, res) => {
    try {
      const response = await strapiAPI.put(`/tests/${req.params.id}`, {
        data: req.body
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete test
  deleteTest: async (req, res) => {
    try {
      const response = await strapiAPI.delete(`/tests/${req.params.id}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = strapiController; 
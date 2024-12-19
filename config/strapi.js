const axios = require('axios');

const strapiAPI = axios.create({
  baseURL: process.env.STRAPI_URL || 'http://localhost:1337/api',
  headers: {
    'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

module.exports = strapiAPI; 
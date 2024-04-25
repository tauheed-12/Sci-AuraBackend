const express = require('express');
const router = express.Router();
const Hospital = require('../Models/Hospital.js');

router.get('/home', async (req, res) => {
  try {
    const data = await Hospital.find(); 
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

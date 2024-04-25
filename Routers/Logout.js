const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

module.exports = router;

const express = require('express');
const router = express.Router();

// @route GET api/beers
// @desc get all beers
// @access public

router.get('/', [], async (req, res) => {
  try {
    const beers = require('../../beers.json');
    res.json(beers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;

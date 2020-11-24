const express = require('express');
const router = express.Router();
const { client } = require('../../config/db');

router.get('/', [], async (req, res) => {
  try {
    const getAllFoodsNameQuery = `SELECT DISTINCT name FROM foods`;
    const result = await client.query(getAllFoodsNameQuery);
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Could not fetch foods from db');
  }
});

module.exports = router;

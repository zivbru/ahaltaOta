const express = require('express');
const router = express.Router();
const { client } = require('../../config/db');

router.post('/', [], async (req, res) => {
  const { firstName, lastName, birthDate, beer, Id, phone, foods } = req.body;
  try {
    await client.query(
      `insert into users(userid, firstname , lastname, birthdate, phone, favoritebeer,foods) 
                     VALUES ($1,$2, $3, $4, $5,$6,$7)`,
      [
        parseInt(Id),
        firstName,
        lastName,
        birthDate,
        phone,
        beer,
        `{"foods": ${JSON.stringify(foods)} }`,
      ],
      async (err, userResult) => {
        if (err) {
          console.log('err', err);
          return res.status(500).send({ message: err.detail });
        } else {
          await foods.map((food) => {
            client.query(
              'insert into foods (name, userid) values ($1, $2)',
              [food, parseInt(Id)],
              (err, foodResult) => {
                if (err) {
                  console.log('err1', err);
                  return res.status(500).send(err.detail);
                } else {
                }
              }
            );
          });
          return res.json('User added succesfully!');
        }
      }
    );
  } catch (error) {
    console.log('error.message', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;

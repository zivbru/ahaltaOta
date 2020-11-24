const express = require('express');
const router = express.Router();
const { client } = require('../../config/db');

router.post('/', [], async (req, res) => {
  console.log('req.body', req.body);
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
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          foods.map(async (food) => {
            console.log(food);
            await client.query(
              'insert into foods (name, userid) values ($1, $2)',
              [food, parseInt(Id)],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).send(err);
                } else {
                  res.json('User added!');
                }
              }
            );
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Could not fetch foods from db');
  } finally {
    // res.json('new food inserted');
    // client.end();
  }
});

module.exports = router;

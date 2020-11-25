const express = require('express');
const router = express.Router();
const { client } = require('../../config/db');

const getUserFromomDb = async (id) => {
  const query = `SELECT * FROM users where googleid = $1`;
  const values = [id];
  const response = await client.query(query, values);
  return response.rows[0];
};

router.post('/', [], async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    beer,
    Id,
    phone,
    googleId,
    foods,
  } = req.body;

  try {
    const user = await getUserFromomDb(googleId);

    if (user) {
      res.json('User exists');
      // need to update his data ?
      // need to updated the food table
    } else {
      // save the user
      const insertUserQuery = `INSERT INTO users(googleId, firstname , lastname, birthdate, phone, israelId, favoritebeer)  VALUES ($1,$2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [
        googleId,
        firstName,
        lastName,
        birthDate,
        phone,
        Id,
        beer,
      ];

      await client.query(insertUserQuery, values);

      // get all foods names
      const foodsQuery = 'select * from foods';
      const resFoodsInDb = await client.query(foodsQuery);
      const foodsInDb = resFoodsInDb.rows;

      // update foodtable and usersfoods table
      foods.map(async (food) => {
        const isExistsInFoodTable = foodsInDb.find((f) => f.name === food);
        let foodId = (isExistsInFoodTable || {}).foodid || null;
        if (!isExistsInFoodTable) {
          // insert food into food table
          const insertFoodsQuery =
            'insert into foods (name) values ($1) RETURNING *';
          const insertFoodsValues = [food];

          const insertFoodRes = await client.query(
            insertFoodsQuery,
            insertFoodsValues
          );
          const insertedFood = insertFoodRes.rows[0];
          foodId = insertedFood.foodid;
        }
        // insert into usersfoods table
        const insertUsersFoodsQuery =
          'insert into usersfoods (userid, foodid) values ($1, $2) RETURNING *';
        console.log('foodId', foodId);
        const insertUsersFoodsValues = [googleId, foodId];

        await client.query(insertUsersFoodsQuery, insertUsersFoodsValues);
        res.json('Process completed!!');
      });
    }
  } catch (error) {
    console.log('error.message', error.message);
    res.status(500).send(error.message);
  }
});

router.get('/:id', [], async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserFromomDb(id);

    return res.json(user || null);
  } catch (error) {
    console.log('error.message', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;

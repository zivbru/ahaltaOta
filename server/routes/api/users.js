const express = require('express');
const router = express.Router();
const { client } = require('../../config/db');

const getUserById = async (id) => {
  const query = `SELECT * FROM users where googleid = $1`;
  const values = [id];
  const response = await client.query(query, values);
  return response.rows[0];
};

const getUsersFoodById = async (id) => {
  const getUsersFoodQuery = `SELECT foodid, name FROM foods 
                             INNER JOIN usersfoods on foodid = fkfoodid and userid = '${id}'`;
  const result = await client.query(getUsersFoodQuery);
  return result.rows;
};

const getAllFoodsNames = async () => {
  const foodsQuery = 'select * from foods';
  const resFoodsInDb = await client.query(foodsQuery);
  return resFoodsInDb.rows;
};

const insertIntoFoodsTable = async (food) => {
  // insert food into food table
  const insertFoodsQuery = 'insert into foods (name) values ($1) RETURNING *';
  const insertFoodsValues = [food];
  const insertFoodRes = await client.query(insertFoodsQuery, insertFoodsValues);
  const insertedFood = insertFoodRes.rows[0];
  return insertedFood.foodid;
};

const insertIntoUsersFoodsTable = async (id, foodId) => {
  // insert into usersfoods table
  const insertUsersFoodsQuery =
    'insert into usersfoods (userid, fkfoodid) values ($1, $2) RETURNING *';
  const insertUsersFoodsValues = [id, foodId];

  await client.query(insertUsersFoodsQuery, insertUsersFoodsValues);
};

router.post('/', [], async (req, res) => {
  const { firstName, lastName, birthDate, beer, Id, phone, foods } = req.body;

  try {
    let user = await getUserById(req.headers.id);
    const foodsInDb = await getAllFoodsNames();
    let str = '';

    if (user) {
      //update User data
      user.firstname !== firstName
        ? (str = `firstname = '${firstName}', `)
        : '';
      user.lastname !== lastName ? (str += `lastName = '${lastName}', `) : '';
      user.beer !== beer && beer ? (str += `favoritebeer = '${beer}',`) : '';
      user.israelid !== Id ? (str += `Id = '${Id}',`) : '';
      user.phone !== phone ? (str += `phone = '${phone}'`) : '';
      user.birthdate !== birthDate ? (str += `birthDate = '${birthDate}'`) : '';

      const updateUserQuery = `UPDATE users SET ${str} Where googleId = '${req.headers.id}'`;
      await client.query(updateUserQuery);

      // update the foods user table
      const foodWithCurrentUserId = await getUsersFoodById(req.headers.id);
      let foodId = null;
      foods.map(async (food) => {
        const isExistsInFoodTable = foodsInDb.find((f) => f.name === food.name);
        foodId = (isExistsInFoodTable || {}).foodid || null;
        if (!isExistsInFoodTable) {
          foodId = await insertIntoFoodsTable(food);
          await insertIntoUsersFoodsTable(req.headers.id, foodId);
        }
      });
      foodWithCurrentUserId.forEach(async (element) => {
        if (foods.indexOf(element.name) < 0) {
          const deleteQuery = `Delete  from usersfoods where userid = '${req.headers.id}' 
                               and fkfoodid = '${element.foodid}'`;
          const result = await client.query(deleteQuery);
        }
      });
      foods.map(async (food) => {
        // insert into usersfoods table
        await insertIntoUsersFoodsTable(req.headers.id, food.foodid || foodId);
      });

      // res.json('User exists');
    } else {
      // save the user
      const insertUserQuery = `INSERT INTO users(googleId, firstname , lastname, birthdate, phone, israelId, favoritebeer)  VALUES ($1,$2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [
        req.headers.id,
        firstName,
        lastName,
        birthDate,
        phone,
        Id,
        beer,
      ];

      await client.query(insertUserQuery, values);

      // update foodtable and usersfoods table
      foods.map(async (food) => {
        const isExistsInFoodTable = foodsInDb.find((f) => f.name === food);
        let foodId = (isExistsInFoodTable || {}).foodid || null;
        if (!isExistsInFoodTable) {
          foodId = await insertIntoFoodsTable(food.name);
        }

        // insert into usersfoods table
        await insertIntoUsersFoodsTable(req.headers.id, foodId);
      });
    }
    res.json('Process completed!!');
  } catch (error) {
    console.log('error.message', error.message);
    res.status(500).send(error.message);
  }
});

router.get('/:id', [], async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (user) {
      user.foods = await getUsersFoodById(id);
    }
    return res.json(user || null);
  } catch (error) {
    console.log('error.message', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;

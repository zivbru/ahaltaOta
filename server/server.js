const express = require('express');
const app = express();
const { connectDB } = require('./config/db');
const { createTabels } = require('./db/queries');
const cors = require('cors');
const beers = require('./routes/api/beers');
const foods = require('./routes/api/foods');
const users = require('./routes/api/users');

connectDB();
// createTabels();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/beers', beers);
app.use('/api/foods', foods);
app.use('/api/users', users);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

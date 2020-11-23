const express = require('express');
const app = express();
const { connectDB } = require('./config/db');
const cors = require('cors');
const beers = require('./routes/api/beers');

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/beers', beers);
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/users', require('./routes/api/foods'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

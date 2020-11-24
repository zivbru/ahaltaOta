const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: 'Zivbru7324753',
  host: 'localhost',
  synchronize: true,
  port: 5432,
  database: 'ahaltaota',
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('DB connected!!');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, client };

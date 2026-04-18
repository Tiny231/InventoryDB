require('dotenv').config();

const express = require('express');
const connectDB = require('./configs/dataBase'); // your DB connection file


const productRoutes = require('./routes/productRoute');


connectDB();

const app = express();

// middleware
app.use(express.json());


app.use('/api/', productRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
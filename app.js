require('dotenv').config();

const express = require('express');
const connectDB = require('./configs/dataBase'); // your DB connection file


const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
connectDB();

const app = express();

// middleware
app.use(express.json());

// ROUTES
app.use('/api', productRoutes);

app.use('/api', userRoutes)









app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
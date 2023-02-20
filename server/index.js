// import express from 'express';
const express = require("express");
// import * as dotenv from 'dotenv';
const dotenv = require("dotenv");
// import cors from 'cors';
const cors = require("cors");

// import connectDB from './mongodb/connect.js';
const connectDB = require("./mongodb/connect");
// import postRoutes from './routes/postRoutes.js';
const postRoutes = require("./routes/postRoutes");
// import dalleRoutes from './routes/dalleRoutes.js';
const dalleRoutes = require("./routes/dalleRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});


const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();

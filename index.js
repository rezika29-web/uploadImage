// const express = require("express");
// const app = express();
// const db = require("./src/models");
// const initRoutes = require("./src/routes/web");

// global.__basedir = __dirname;

// app.use(express.urlencoded({ extended: true }));
// initRoutes(app);

// db.sequelize.sync();
// // db.sequelize.sync({ force: true }).then(() => {
// //   console.log("Drop and re-sync db.");
// // });

// let port = 3000;
// app.listen(port, () => {
//   console.log(`Running at localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const db = require('./src/models');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const uploadRoutes = require('./src/routes/web');
app.use('/api', uploadRoutes);

// Database connection
db.sequelize.sync().then(() => {
  console.log('Database connected.');
}).catch((error) => {
  console.log('Error connecting to the database:', error);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

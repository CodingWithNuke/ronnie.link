require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const path = require('path')

// Define app
const app = express();

// Inject dependencies
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
// app.use(express.static(path.join(__dirname, 'views')));

// Initialize routes
const Routes = require('./routes');
Routes(app);

// Initialize error handler
app.use((error, req, res, next) => {
  if (error.statusCode) {
    res.status(error.statusCode);
  } else {
    res.status(500);
  }

  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  })
});

// Setup Database
const Database = require('./database');
Database();

// Setup port variable
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`[HTTP] Server is listening on port ${port}.`);
})
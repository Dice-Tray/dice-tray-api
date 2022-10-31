const dotenv = require('dotenv');
const express = require('express');

const { applyMiddlewares } = require('./middlewares');
const applyRoutes = require('./routes');

// Load environment variables.
dotenv.config();

//create an app
const app = express();

// Apply middlewares.
applyMiddlewares(app);

// Apply routes
applyRoutes(app);

const port = 3001;

app.listen(port, () => {
  console.log('App is now running at port ', port);
});

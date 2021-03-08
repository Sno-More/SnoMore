const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
const environment = process.env.NODE_ENV || 'development';
const mongoose = require("mongoose");

//Passport Js
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')


//Deprication warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
console.log(process.env.NODE_ENV);
if (environment === 'production') {
  app.use(express.static('client/build'));
}
// Add routes, both API and view
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/snowmore", { useNewUrlParser: true });

// Start the API server

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

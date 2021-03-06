const db = require('../models');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/snowmore", { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });


db.User.create({
    username: 'carlschr',
    password: 'password1',
    email: 'cjcarlson136@gmail.com',
    location: 'Lakeview East, IL',
    role: 'poster'
}).then(() => {
    mongoose.disconnect();
});
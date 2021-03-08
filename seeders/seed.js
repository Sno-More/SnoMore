const db = require('../models');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/snowmore", { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });

const users = [{
    username: 'carlschr',
    password: 'password1',
    email: 'cjcarlson136@gmail.com',
    location: 'Lakeview East, IL',
    role: 'poster'
}, {
    username: 'gabagool',
    password: 'password1',
    email: 'something@gmail.com',
    location: 'somewhere, nebraska',
    role: 'shoveler'
}];

db.User.deleteMany({}, () => {
    db.User.insertMany(users, (err) => {
        console.log(err);
    });
});
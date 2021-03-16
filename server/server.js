const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express()
const PORT = 3001
// Route requires
const user = require('./routes/user')
const job = require('./routes/job')
const twilio = require('./routes/twilio')
const pino = require('express-pino-logger')();
const client = require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);


// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	express.urlencoded({
		extended: false
	})
)
app.use(express.json())

// Sessions
app.use(
	session({
		secret: 'SnOmOre', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Twilio
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

require('dotenv').config();

app.post('/api/messages', (req, res) => {
	res.header('Content-Type', 'application/json');
	client.messages
		.create({
			from: process.env.TWILIO_PHONE_NUMBER,
			to: '+16145614936',
			body: 'this is a test'
		})
		.then(() => {
			res.send(JSON.stringify({ success: true }));
		})
		.catch(err => {
			console.log(err);
			res.send(JSON.stringify({ success: false }));
		});
});

// Routes
app.use('/user', user)
app.use('/api', job)
// app.use('/sms', twilio)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})

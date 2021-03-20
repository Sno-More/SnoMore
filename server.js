const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./server/database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./server/passport');
const app = express()
const PORT = process.env.PORT || 3001
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './server/.env') })
// Route requires
const user = require('./server/routes/user')
const job = require('./server/routes/job')
const send_sms = require('./server/routes/send_sms')


// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	express.urlencoded({
		extended: false
	})
)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	// app.get("*",function(req, res) {
	// 	res.sendFile(path.join(__dirname, "./client/build/index.html"));
	//   });
  }


  




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

// Routes
app.use('/user', user)
app.use('/api', job)
app.use('/sms', send_sms)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})

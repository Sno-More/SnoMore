const express = require('express')
const router = express.Router()
const {SMS} = require('../database/models')
const mongoose = require('mongoose');
require('dotenv').config();
const client = require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);
// const pino = require('express-pino-logger')();

router.post('/messages', (req, res) => {
	res.header('Content-Type', 'application/json');
	client.messages
		.create({
			from: process.env.TWILIO_PHONE_NUMBER,
			to: '+16145614936',
			body: 'this is another test'
		})
		.then(() => {
			res.send(JSON.stringify({ success: true }));
		})
		.catch(err => {
			console.log(err);
			res.send(JSON.stringify({ success: false }));
		});
});

//   router.post('/sms', (req, res) => {
//     let newJob = req.body;
//     newJob.poster = req.user._id;
//     Job.create(newJob, (err, response) => {
//         if (err) {
//             console.error(err);
//             return;
//         };
//         res.json(response);
//         console.log(response);
//         User.findOneAndUpdate({
//             _id: mongoose.Types.ObjectId(req.user._id)
//         }, {
//             $push: {
//                 jobs: response._id
//             }
//         }, {new: true}, (e, r) => {
//             if (e) {
//                 console.error(e);
//                 return;
//             };
//             console.log(r);
//         });
//     });
// });

module.exports = router
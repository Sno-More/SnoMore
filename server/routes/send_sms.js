const express = require('express')
const router = express.Router()
// const { SMS } = require('../database/models')
const mongoose = require('mongoose');

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  // process.env.TWILIO_PHONE_NUMBER
);

router.post('/messages', (req, res) => {
  console.log('req body', req.body.messageTo)
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: '+14427776991',
      to: req.body.messageTo,
      body: 'this is it'
    })
    .then(() => {
      console.log('thennnnnnnnnnnn')
      res.send({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false });
    });
});

module.exports = router
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is a test?',
     from: process.env.TWILIO_PHONE_NUMBER,
     to: '+16145614936'
   })
  .then(message => console.log(message.sid));
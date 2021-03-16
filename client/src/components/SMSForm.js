export default function SMSForm() {
    const phoneNumber = '+14439687001'
    const accountSID = 'AC437d97b76f91182dc1465ed4cccbad08'
    const authToken = '8df5b9aa75267c9717b2dfaf7e8fe542'
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
            from: '+15017122661',
            to: '+15558675310'
        })
        .then(message => console.log(message.sid));
    return (
        <p>test</p>
    )
}
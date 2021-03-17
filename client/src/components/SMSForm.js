import { useState, useEffect } from 'react'

export default function SMSForm(props) {
    const [sms, setSms] = useState(
        {
            messageTo: '+16145614936',
            messageBody: 'testing text',
            submitting: false,
            error: false
        })
    // const phoneNumber = '+14439687001'
    // const accountSID = 'AC437d97b76f91182dc1465ed4cccbad08'
    // const authToken = '8df5b9aa75267c9717b2dfaf7e8fe542'
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = require('twilio')(accountSid, authToken);

    // // client.messages
    //     .create({
    //         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //         from: '+15017122661',
    //         to: '+15558675310'
    //     })
    //     .then(message => console.log(m`essage.sid));


    function handleSubmit(event) {
        event.preventDefault()
        setSms({ submitting: true });
        console.log('sms', sms)
        fetch('/sms/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sms)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSms({
                        error: false,
                        submitting: false,
                        messageTo: '',
                        messageBody: ''

                    });
                } else {
                    setSms({
                        error: true,
                        submitting: false
                    });
                }
            });
    }


    return (
        <button type="submit" onClick={handleSubmit}>
            Send message
        </button>
    )
}
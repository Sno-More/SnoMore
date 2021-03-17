import { useState, useEffect } from 'react'

export default function SMSForm(props) {
    const [sms, setSms] = useState(
        {
            messageTo: '+16145614936',
            messageBody: 'testing text',
            submitting: false,
            error: false
        })
    
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
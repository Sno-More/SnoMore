
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ job, open, methods, jobListings, setJobListings }) {
  const [posterPhone, setPosterPhone] = useState('')
  const [shovelerPhone, setShovelerPhone] = useState('')
  const [sms, setSms] = useState(
    {
        messageTo: '',
        messageBody: '',
        submitting: false,
        error: false
    })
  //shoveler accept job button
  async function handleAcceptJob (id) {
    //     console.log('handleacceptjob')
    // console.log('phone', job.poster.phone)
    setPosterPhone(job.poster.phone)
    await axios.get('/user/info')
    .then(
      response => {
        setShovelerPhone(response.data[0].phone)
      }
    )
      // console.log(posterPhone)
    // adds shoveler id to job and job to shoveler job array
    await axios.put(`/api/user/jobs/add/${id}`)
      .then(
      //   response => {
      //     axios.get('/api/jobs/available')
      //       .then(function (res) {
      //         setJobListings(res.data)
      //       })
      //     console.log('response', response.data)
      //   })
      // .catch(e => {
      //   console.log(e)
      // }
      )
      await setSms({ 
        messageTo: {posterPhone},
        messageBody: `Your job has been accepted`,
        submitting: true });
      await fetch('/sms/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sms})
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


  const handleCompletedJob = (event) => {
    //pending value will still be true 
    //change completed value to true
    //relocate job to the completed tab
    //send text notification to both parties that job has been completed
  }

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {job.title}
          </Typography>
          <Typography variant="h5">
            Pay: ${job.pay}
          </Typography>
          <Typography variant="h5" component="h2">
            Address:{job.location}
          </Typography>

          <Typography variant="body2" component="p">
            {job.description}
          </Typography>
          {/* <button onClick={handleConfirmJob}> Confirm Job </button> */}
          {job.pending === false ?
            <button onClick={() => handleAcceptJob(job._id)}>Accept This Job</button>
            :
            <button onClick={() => handleCompletedJob(job._id)}>Completed This Job</button>
          }
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={methods.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}


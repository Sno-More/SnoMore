
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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

export default function SimpleModal({ job, open, methods}) {
  // const [posterPhone, setPosterPhone] = useState('')
  // const [shovelerPhone, setShovelerPhone] = useState('')
  // const [sms, setSms] = useState(
  //   {
  //       messageTo: '',
  //       messageBody: '',
  //       submitting: false,
  //       error: false
  //   })
  // console.log('job', job)
  let currentJob = job;
  if (!job.poster) {
    currentJob = {
      poster: {
        phone: '+16109557597'
      }
    }
  }
  let posterPhone = currentJob.poster.phone
  let posterSMS = {
    messageTo: posterPhone,
    messageBody: 'Your job has been accepted!',
    submitting: false,
    error: false
  }
  let shovelerSMS = {
    messageTo: '',
    messageBody: "You've accepted the job",
    submitting: false,
    error: false
  }

  //shoveler accept job button
  function handleAcceptJob(id) {
    //     console.log('handleacceptjob')
    // console.log('phone', job.poster.phone)
    // setPosterPhone(job.poster.phone)
    axios.get('/user/info')
      .then(
        response => {
          console.log('response', response.data[0].firstName);
          let shovelerPhone = response.data[0].phone
          shovelerSMS = {
            messageTo: shovelerPhone,
            messageBody: `${response.data[0].firstName}, accepted the job`,
            submitting: false,
            error: false
          }
          posterSMS = {
            messageTo: posterPhone,
            messageBody: `${response.data[0].firstName} has accepted your job`,
            submitting: false,
            error: false
          }
          axios.post('/sms/messages', shovelerSMS)
            .then(data => {
              if (data.data.success) {
                console.log(data);
                shovelerSMS = {
                  error: false,
                  submitting: false,
                  messageTo: '',
                  messageBody: ''
                };
              } else {
                console.log('no');
                shovelerSMS.error = true
                shovelerSMS.submitting = false
              };
            }
          );
          axios.post('/sms/messages', posterSMS)
            .then(data => {
              if (data.data.success) {
                console.log('yes');
                posterSMS = {
                  error: false,
                  submitting: false,
                  messageTo: '',
                  messageBody: ''
                };
              } else {
                console.log('no');
                posterSMS.error = true
                posterSMS.submitting = false
              };
            }
          );
          axios.put(`/api/user/jobs/add/${id}`)
          .then( response => {
            console.log('response', response.data)
          })
          .catch(e => {
            console.log(e)
          });
        })
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


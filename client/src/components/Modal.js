import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const notify = () => toast('Here is your toast.');

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

export default function SimpleModal({ job, open, methods }) {

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
    methods.handleClose();
    axios.get('/user/info')
      .then(
        response => {
          console.log('response', response);
          let shovelerPhone = response.data[0].phone
          shovelerSMS = {
            messageTo: shovelerPhone,
            messageBody: `${response.data[0].firstName}, thanks for accepting this job!`,
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
            .then(response => {
              console.log('response', response.data)
              axios.get('/api/user/jobs').then((data) => {
                console.log(data)
                methods.setMyJobs(data.data.jobs);
                methods.setJobListings([]);
              });
            })
            .catch(e => {
              console.log(e)
            });
        })
        toast.success("Thank you for accepting this snow removal job! Please make sure to complete it by the date posted!",
        {
          duration: 5000,
          // Styling
          position: 'center',
          style: {
            border: '2px solid #713200',
            padding: '20px',
            marginTop: '82px',
            color: 'white',
            backgroundColor: 'rgb(60, 179, 113, 0.7)'
          },
          icon: '🌨️',
          role: 'status',
          ariaLive: 'polite',
        });
  }

  //shoveler completes job button
  const handleCompletedJob = (id) => {
    methods.handleClose()
    axios.get('/user/info')
      .then(
        response => {
          console.log('response', response);
          let shovelerPhone = response.data[0].phone
          shovelerSMS = {
            messageTo: shovelerPhone,
            messageBody: `${response.data[0].firstName}, thanks for completing the job! Your payment is coming.`,
            submitting: false,
            error: false
          }
          posterSMS = {
            messageTo: posterPhone,
            messageBody: `${response.data[0].firstName} has completed your job! We look forward to helping you again!`,
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
          axios.put(`/api/job/${id}`, {
            complete: true
          })

            .then(response => {
              console.log('response', response.data)

              axios.put(`/api/job/${id}`).then((data) => {
                methods.setMyJobs(data.data.jobs)
              })

            })
            .catch(e => {
              console.log(e)
            });
        })
        toast.success("Thank you for completing this snow removal job! You're payment is on its way!",
        {
          duration: 5000,
          // Styling
          position: 'center',
          style: {
            border: '2px solid #713200',
            padding: '20px',
            marginTop: '82px',
            color: 'white',
            backgroundColor: 'rgb(60, 179, 113, 0.7)'
          },
          icon: '🌨️',
          role: 'status',
          ariaLive: 'polite',
        });
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
      <Toaster/>
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


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
const notify = () => toast('Here is your toast.');

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: 320,
    height: 'min-content',
    backgroundColor: theme.palette.white.main,
    border: '5px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    '&>*': {
      margin: theme.spacing(.5)
    }
  },
}));

export default function SimpleModal({ useButton = false, job, open, methods }) {

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

              axios.get(`/api/user/jobs`).then((data) => {
                console.log(data)
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

  // const [modalStyle] = React.useState(getModalStyle);


  const body = (
    <div className={classes.paper}>
          <Typography variant="h3">
            {job.title}
          </Typography>
          <Typography variant="body1">
            <strong>Pay:</strong> ${job.pay}
          </Typography>
          <Typography variant="body1">
          <strong>Address:</strong> {job.location}
          </Typography>
          <Typography variant="body1">
          <strong>Complete by:</strong> {job.date?.split('T')[0]}
          </Typography>
          <Typography variant="body1">
          <strong>Details:</strong> {job.description}
          </Typography>
          {useButton === false 
          ? '' 
          : job.pending === false 
          ? <Button onClick={() => handleAcceptJob(job._id)}>Accept Job</Button>
          : <Button onClick={() => handleCompletedJob(job._id)}>Mark as Complete</Button>
          }
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


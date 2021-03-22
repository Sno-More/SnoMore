import React, { useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import toast, { Toaster } from 'react-hot-toast';

export default function JobPost({ type, setMyJobs }) {

  const [job, setJob] = useState({ title: "", location: "", zipCode: "", pay: "", description: "", date: "" })
  const [jobType, setJobType] = useState("")


  const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      padding: theme.spacing(.5, 2),
      margin: theme.spacing(0)
    },
    submit: {
      margin: theme.spacing(1, 0),
      color: theme.palette.primary.main
    },

  }))

  const handleInput = (event, limit = undefined) => {
    if (limit) {
      if (limit < event.target.value.length) return;
    };
    const { name, value } = event.target;
    setJob({ ...job, [name]: value })
    setJobType(type)

  }

  const classes = useStyles();

  const handleJobSubmit = (event) => {
    event.preventDefault()

    // axios post to database
    axios.post('/api/jobs', {
      title: job.title,
      location: job.location,
      zipCode: job.zipCode,
      pay: job.pay,
      description: job.description,
      date: job.date,
      type: jobType

    })
      .then(() => {
        axios('/api/user/jobs')
          .then((data) => {
            setMyJobs(data.data.jobs)
          }
          )
          toast.success("Your job has been posted! We'll notify you when someone accepts your snow removal job!",
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
      )
    setJob({ title: "", location: "", zipCode: "", pay: "", description: "", date: "" })

  }

  return (
    <div className={classes.div}>

      <Grid container spacing={1} className={classes.form} justify='center'>
        <Grid item xs={12} >
          <TextField
            type="text"
            value={job.title}
            name="title"
            fullWidth
            onChange={handleInput}
            label='Title' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            fullWidth
            value={job.location}
            name="location"
            onChange={handleInput}
            label='Address' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            fullWidth
            value={job.zipCode}
            name="zipCode"
            onChange={(e) => {
              handleInput(e, 5);
            }}
            label='5-digit Zip Code' />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            fullWidth
            value={job.pay}
            name="pay"
            onChange={handleInput}
            label='$ Flat Rate' />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Complete by:"
            type="date"
            fullWidth
            value={job.date}
            name="date"
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            multiline
            rowsMax={3}
            fullWidth
            value={job.description}
            name="description"
            onChange={handleInput}
            label='Details' />
        </Grid>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          onClick={handleJobSubmit}
        >
          Post Job
        </Button>


      </Grid>
    </div>
  )
}
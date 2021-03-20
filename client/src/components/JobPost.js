import React, { useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


export default function JobPost({ type }) {

  const [job, setJob ] = useState({ title: "", location: "", zipCode: "", pay: "", description: "", date: "",})
  const [jobType, setJobType ] = useState("")

 
  const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },

  }))


  const handleInput = (event) => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value })
    setJobType(type)

  }




  const classes = useStyles();

  const handleJobSubmit = (event) => {
    event.preventDefault()
    console.log('post object', job)

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

  }

  return (
    <>
   
    <form>
    <Grid>
        <TextField
          type="text"
          value={job.title}
          name="title"
          onChange={handleInput}
          placeholder='Title'/>
    </Grid>
    <Grid>
        <TextField
          type="text"
          value={job.location}
          name="location"
          onChange={handleInput}
          placeholder='Address'/>
    </Grid>
    <Grid>
        <TextField
          type="text"
          value={job.zipCode}
          name="zipCode"
          onChange={handleInput}
          placeholder='5-digit Zip Code'/>
    </Grid>
    <Grid>
        <TextField
          type="text"
          value={job.pay}
          name="pay"
          onChange={handleInput}
          placeholder='Rate'/>
    </Grid>
    <Grid>
        <TextField
          type="text"
          value={job.description}
          name="description"
          onChange={handleInput}
          placeholder='Details' />
          </Grid>
    <Grid>
        <TextField
          type="text"
          value={job.date}
          name="date"
          onChange={handleInput}
          placeholder='Date must be completed by' />
    </Grid>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleJobSubmit}
            >
        Post Job
        </Button>
   

      </form>
    </>
  )
}
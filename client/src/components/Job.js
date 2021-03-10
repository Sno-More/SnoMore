import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 1000,
        margin: '50px 50px 50px 200px',

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Job({ job, jobListings, setJobListings }) {
    console.log('job', job)

    // const [jobs, setJobs] = useState()

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const handleAcceptJob = (id) => {
        console.log('handleacceptjob')

        /* this isn't working
        //find all != to id and set
        const updatedJobListings = jobListings.filter(job => job.id != id)
        console.log('updated', updatedJobListings)
        //set jobs to all not equal to as our new array
        setJobListings(updatedJobListings)
        */

        /*
        maybe need a put route to update job listing as 'taken' and then a get to display all jobs not 'taken
        */

        // modal to confirm job is taken?
        
        axios.put(`/api/user/jobs/add/${id}`)
        .then(response => {
            console.log(response)
        })
        .catch(e => {
            console.log(e)
        })
    }
    console.log('joblistings', jobListings)
    
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {job.title}{bull}title here
            </Typography>
                <Typography variant="h5" component="h2">
                    {job.address}{bull}address here
            </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {/* {job.pay} */}{bull}rate here
            </Typography>
                <Typography variant="body2" component="p">
                    {/* {job.description} */}{bull}details here
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" style={{ border: 'solid black' }} onClick={() => handleAcceptJob(job.id)}>Accept Job</Button>
            </CardActions>
            <CardActions>
                <Button size="small" style={{ border: 'solid black' }} href='/shovelerfeed'>Back to Job Listings</Button>
            </CardActions>
        </Card>
    );
}

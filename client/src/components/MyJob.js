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

export default function MyJob({ currentJob, myJobs, setMyJobs }) {

    console.log('currentjob', currentJob)

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    //complete job - change complete to true, get new list of incomplete jobs
    const handleCompleteJob = (id) => {
        axios.put(`api/job/${id}`, { complete: true })
            .then(
                response => {
                    axios.get(`/api/user/jobs/`)
                    setMyJobs(response.data.jobs)
                })
            .catch(e => {
                console.log(e)
            }
            )
    }
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {bull}{currentJob.title}
                </Typography>
                <Typography variant="h5" component="h2">
                    {bull}{currentJob.location}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {bull}{currentJob.pay}
                </Typography>
                <Typography variant="body2" component="p">
                    {bull}{currentJob.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" style={{ border: 'solid black' }} onClick={() => handleCompleteJob(currentJob._id)}>Complete Job</Button>
            </CardActions>
            <CardActions>
                <Button size="small" style={{ border: 'solid black' }} href='/shovelerdashboard'>Back to Dashboard</Button>
            </CardActions>
        </Card>
    )
}
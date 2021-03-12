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

    export default function MyJob() {

    // const [jobs, setJobs] = useState()

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return(
        <Card className={classes.root} variant="outlined">
            {/* <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {bull}{job.title}
                </Typography>
                <Typography variant="h5" component="h2">
                    {bull}{job.location}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {bull}{job.pay}
                </Typography>
                <Typography variant="body2" component="p">
                    {bull}{job.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" style={{ border: 'solid black' }} onClick={() => handleAcceptJob(job._id)}>Accept Job</Button>
            </CardActions>
            <CardActions>
                <Button size="small" style={{ border: 'solid black' }} href='/shovelerfeed'>Back to Job Listings</Button>
            </CardActions> */}
        </Card>
    )
}
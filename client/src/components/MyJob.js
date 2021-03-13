import React from 'react';
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

export default function MyJob({ myJob, myJobs, setMyJobs }) {
    console.log('myJob', myJob)

    // const [jobs, setJobs] = useState()

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    //shoveler complete job button
    const handleCompleteJob = (id) => {

        //     //completes job
        axios.put(`/api/job/${id}`, { complete: true })
            .then(
                response => {
                    axios.get('/api/user/jobs')
                        .then(function (res) {
                            const jobsArray = res.data.jobs
                            const updatedMyJobs = jobsArray.filter(incomplete => incomplete._id != id)
                            setMyJobs(updatedMyJobs)
                            console.log('my jobs', myJobs)

                        })
                })
            .catch(e => {
                console.log(e)
            }
            )
    }
    //  get route to get new listings
    //  and set as variable

    // modal to confirm job is taken?

    console.log('myjobs', myJobs)

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {bull}{myJob.title}
                </Typography>
                <Typography variant="h5" component="h2">
                    {bull}{myJob.location}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {bull}{myJob.pay}
                </Typography>
                <Typography variant="body2" component="p">
                    {bull}{myJob.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" style={{ border: 'solid black' }} onClick={() => handleCompleteJob(myJob._id)}>Complete Job</Button>
            </CardActions>
            <CardActions>
                <Button size="small" style={{ border: 'solid black' }} href='/shovelerdashboard'>Back to Dashboard</Button>
            </CardActions>
        </Card>
    );

    // }
}
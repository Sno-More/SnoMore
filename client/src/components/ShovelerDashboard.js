import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        // '& > *': {
        //     margin: theme.spacing(1),
        //     width: '25ch',
        // },
        minWidth: 275,
    },

    title: {
        fontSize: 30,
    },
    pos: {
        marginBottom: 12,

    }
}));



export default function ShovelerDashboard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [myJobs, setMyJobs] = useState([])
    const [currentJob, setCurrentJob] = useState([])

    useEffect(() => {
        async function fetchMyJobs() {
            try {
                const response = await axios('/api/user/jobs')
                setMyJobs(response.data.jobs)
            } catch (e) {
                console.log(e)
            }
        }
        fetchMyJobs()
    }, [])

    useEffect(() => {
        console.log('my jobs', myJobs)
    })

    function handleSeeMoreMyJob(id) {
        const foundMyJob = myJobs.find(job => job._id === id)
        console.log('foundmyjob', foundMyJob)
        setCurrentJob(foundMyJob)
    }

    //TBD how to get city
    const handleSaveCity = (event) => {
        event.preventDefault()
        console.log('find city')
    }



    return (

        <>

            <Grid md={5}>
                {/* {{marginTop:"360px"}} */}
                <Container style={{ backgroundColor: "white", marginLeft: "20px" }}>
                    <h1 style={{ textAlign: "center" }}>Find Jobs</h1>
                    <form onSubmit={handleSaveCity}>

                        <form className={classes.root} noValidate autoComplete="off" style={{ color: "white" }}>
                            <TextField id="standard-basic" label="Search your City" />
                        </form>
                        <input style={{ marginBottom: "20px" }}
                            type="submit"
                            value="Search" />

                    </form>
                </Container>


                {/* google maps api here */}
            </Grid>

            <Grid md={6} style={{ textAlign: "center", marginLeft: "700px", marginTop: "-184.5px" }}>
                <Container style={{ backgroundColor: "white" }}>
                    <h1>Upcoming Jobs</h1>
                    {/* lists the shoveler's upcoming jobs  */}
                    {myJobs.map((myJob) => (
                        <Card className={classes.root} style={{ backgroundColor: "lightgray", marginTop: "20px" }}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {myJob.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {myJob.description}
                                </Typography>
                                <Typography>
                                    {myJob.location}
                                </Typography>
                                <Typography>
                                    ${myJob.pay}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/myjob/${myJob._id}`}>
                                    <Button onClick={() => handleSeeMoreMyJob(myJob._id)} size="small" style={{ border: "solid black" }}>See More</Button>
                                </Link>
                            </CardActions>
                        </Card >
                    ))
                    }

                </Container>
            </Grid>

        </>
    )
}

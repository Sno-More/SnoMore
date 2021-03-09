import React, { useState, useEffect } from 'react'
import {
    Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CarJob from './CarJob'
import axios from 'axios'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ShovelerNewsFeed() {
    const classes = useStyles();

    const [carPosts, setCarPosts] = useState([])
    const [carJob, setCarJob] = useState({})

    useEffect(() => {
        async function fetchCarJobs() {
            try{
                const response = await axios('/api/carjobs')
                console.log('response', response.data)
                setCarPosts(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchCarJobs()
    }, [])

    function handleSeeMoreCar(id) {
        //find car in db with matching id
        const foundCar = carPosts.find(job => job.id === id)
        console.log('found car', foundCar)
        //send that job to corresponding route
        setCarJob(foundCar)
        return(
            <CarJob
            carJob={carJob} />
        )
    }

    // fetch to get job posts
    // useEffect(() => {
    //     async function fetchJobPosts() {
    //         try {
    //             const response = await axios('/api/jobposts')
    //             console.log('response', response.data)
    //             setJobPosts(response.data)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     fetchJobPosts()
    // }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Details</TableCell>
                        <TableCell align="center">Rate</TableCell>
                        <TableCell align="center">See More</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carPosts.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell align="center">{job.title}</TableCell>
                            <TableCell align="center">{job.address}</TableCell>
                            <TableCell align="center">{job.details}</TableCell>
                            <TableCell align="center">{job.rate}</TableCell>
                            <TableCell align="center">
                                <Link to={`/carjob/${job.id}`}>
                                    <button onClick={() => handleSeeMoreCar()}>See more</button>
                                    {/* <button onClick={() => handleSeeMore(job.id)}>See more</button> */}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
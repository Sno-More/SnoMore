import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ShovelerNewsFeed() {
    const classes = useStyles();

    const [jobPosts, setJobPosts] = useState([])

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobPosts.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell align="center">{job.title}</TableCell>
                            <TableCell align="center">{job.address}</TableCell>
                            <TableCell align="center">{job.details}</TableCell>
                            <TableCell align="center">{job.rate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
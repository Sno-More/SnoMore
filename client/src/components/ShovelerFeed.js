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
import Job from './Job'
import axios from 'axios'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ShovelerFeed({ jobListings, setJobListings, job, setJob, handleSeeMore }) {
    const classes = useStyles();

    console.log('job', jobListings)

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
                    {jobListings.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell align="center">{job.title}</TableCell>
                            <TableCell align="center">{job.location}</TableCell>
                            <TableCell align="center">{job.description}</TableCell>
                            <TableCell align="center">{job.pay}</TableCell>
                            <TableCell align="center">
                                <Link to={`/job/${job._id}`}>
                                    <button onClick={() => handleSeeMore(job._id)}>See more</button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
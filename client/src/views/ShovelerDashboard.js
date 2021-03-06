import React, { useState} from 'react'
import JobSearch from '../components/JobSearch';
import MyJobs from '../components/MyJobs';
import Grid from '@material-ui/core/Grid';
import SimpleModal from '../components/Modal';
import axios from 'axios';
import Weather from '../components/Weather'

export default function ShovelerDashboard({myJobs, setMyJobs}) {
    const [currentJob, setCurrentJob] = useState({});
    const [open, setOpen] = useState(false);
    const [jobListings, setJobListings] = useState([])

    const handleSeeMore = (job_id) => {
        const fetchJob = async () => {
            const job = await axios('/api/job/' + job_id);
            console.log(job);
            setCurrentJob(job.data);
            handleOpen();
        };
        fetchJob();
    };


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentJob({});
    };

    return (
        <>
        <Grid style={{minHeight: '80vh'}} alignItems='center' container>
            <Grid item xs={12} md={6}>
                <JobSearch jobListings={jobListings} 
                setJobListings={setJobListings} 
                handleSeeMore={handleSeeMore}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <MyJobs myJobs={myJobs} handleSeeMore={handleSeeMore} />
            </Grid>
            <SimpleModal useButton={true} job={currentJob} 
            myJobs={myJobs}
            open={open} 

            methods={{handleClose, handleOpen, setMyJobs, setJobListings}}

            />
        </Grid>
        <Weather/>
        </>
    )
}

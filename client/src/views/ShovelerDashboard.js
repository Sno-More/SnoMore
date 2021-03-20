import React, { useState} from 'react'
import JobSearch from '../components/JobSearch';
import MyJobs from '../components/MyJobs';
import Grid from '@material-ui/core/Grid';
import SimpleModal from '../components/Modal';
import axios from 'axios'

export default function ShovelerDashboard({myJobs, setMyJobs}) {
    const [currentJob, setCurrentJob] = useState({});
    const [open, setOpen] = useState(false);

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
        <Grid style={{minHeight: '85vh'}} alignItems='center' container>
            <Grid item xs={12} md={6}>
                <JobSearch handleSeeMore={handleSeeMore}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <MyJobs myJobs={myJobs} handleSeeMore={handleSeeMore} />
            </Grid>
            <SimpleModal job={currentJob} 
            open={open} 
            methods={{handleClose, handleOpen, setMyJobs}}
            />
        </Grid>
    )
}

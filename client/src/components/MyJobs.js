import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react';

const useStyles = makeStyles({
    h2: {
        textAlign: 'center',
        padding: '2rem'
    },
    container: {
        background: 'white',
        height: '60vmin',
        width: '40%',
        padding: '0',
        margin: '2rem 2rem 2rem auto',
    },
    default: {
        textAlign: 'left',
        width: '50%',
        display: 'block',
        margin: '20% auto',
    }
})

const MyJobs = ({myJobs}) => {
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newVal) => {
        setTabValue(newVal);
    }
    const classes = useStyles();

    const defaultText = (tabValue) ? 'You don\'t have any upcoming jobs. Search for jobs in the "job search" section.'
    : 'You don\'t have any completed jobs. Complete the jobs listed under “incomplete”.'
    let filteredJobs = myJobs.filter(job => job.complete === !tabValue)
    if (filteredJobs.length === 0) {
        filteredJobs = [<Typography className={classes.default} variant='subtitle'>{defaultText}</Typography>]
    }

    return (
        <Container className={classes.container}>
            <Typography className={classes.h2} variant='h2'>MY JOBS</Typography>
            <Paper square>
                <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="jobs"
                    variant='fullWidth'
                >
                    <Tab label="Complete" />
                    <Tab label="Incomplete" />
                </Tabs>
            </Paper>
            {filteredJobs}
        </Container>
    )
}

export default MyJobs;
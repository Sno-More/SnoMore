import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react';
import Card from './Card';

const useStyles = makeStyles(theme => ({
    h2: {
        textAlign: 'center',
        padding: '2rem'
    },
    container: {
        background: theme.palette.transparentWhite.main,
        height: '60vh',
        maxHeight: '100vh',
        minHeight: '60vh',
        width: '85%',
        padding: '0',
        margin: '4rem auto 2rem auto',
        border: 'black 5px solid',
        [theme.breakpoints.down('md')]: {
            height: 'min-content'
        }
    },
    default: {
        textAlign: 'left',
        width: '50%',
        display: 'block',
        margin: '15% auto',
    },
    tabs: {
        backgroundColor: theme.palette.transparentWhite.main,
    },
    jobs: {
        [theme.breakpoints.up('md')]: {
            height: '55%'
        },
        margin: theme.spacing(1, 0),
        overflowY: 'scroll',
        // '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
        // scrollbarWidth: 'none',  /* Firefox */
        // '&::-webkit-scrollbar': { /* Chrome, Safari */
        //     display: 'none'
        // }
    }
}));

const MyJobs = ({ myJobs, handleSeeMore }) => {
    const [tabValue, setTabValue] = useState(1);
    const handleChange = (event, newVal) => {
        setTabValue(newVal);
    }
    const classes = useStyles();

    const defaultText = (tabValue) ? 'You don\'t have any upcoming jobs. Search for jobs in the "job search" section.'
        : 'You don\'t have any completed jobs. Complete the jobs listed under “incomplete”.'
    console.log('my jobs', myJobs);
    let filteredJobs = myJobs.filter(job => job.complete === !tabValue).map(job => {
        return <Card key={job._id} job={job} handleSeeMore={handleSeeMore} />
    })
    console.log(myJobs);
    if (filteredJobs.length === 0) {
        filteredJobs = [<Typography className={classes.default} variant='subtitle2'>{defaultText}</Typography>]
    }

    return (
        <Container className={classes.container}>
            <Typography className={classes.h2} variant='h2'>MY JOBS</Typography>
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
            <div className={classes.jobs}>
                {filteredJobs}
            </div>
        </Container>
    )
}

export default MyJobs;
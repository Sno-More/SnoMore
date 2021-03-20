import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react';
import JobPost from "./JobPost"

const useStyles = makeStyles({
    h2: {
        textAlign: 'center',
        padding: '2rem'
    },
    container: {
        background: 'white',
        height: '60vmin',
        width: '85%',
        padding: '0',
        margin: '4rem auto 2rem auto',
    },
    default: {
        textAlign: 'left',
        width: '50%',
        display: 'block',
        margin: '20% auto',
    }
})


const JobPostForm = () => {
const [tabValue, setTabValue] = useState(0);
const handleChange = (event, newVal) => {
    setTabValue(newVal);
    console.log(tabValue)
}
const classes = useStyles();




let type = (tabValue === 1) ? "car" : "driveway"




return (
    <Container className={classes.container}>
        <Typography className={classes.h2} variant='h2'>POST A JOB</Typography>
        <Paper square>
            <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="jobs"
                variant='fullWidth'
            >
                <Tab label="Driveway" />
                <Tab label="Car" />
            </Tabs>
            <JobPost type={type}  />
        </Paper>
      
    </Container>
)
}

export default JobPostForm
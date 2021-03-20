import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useState } from 'react';
import JobPost from "./JobPost"

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
    }
}));


const JobPostForm = () => {
const [tabValue, setTabValue] = useState(0);
const handleChange = (event, newVal) => {
    setTabValue(newVal);
    console.log(tabValue)
}
const classes = useStyles();




let type = (tabValue) ? "car" : "driveway"




return (
    <Container className={classes.container}>
        <Typography className={classes.h2} variant='h2'>POST A JOB</Typography>
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
      
    </Container>
)
}

export default JobPostForm
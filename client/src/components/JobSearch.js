import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    h2: {
        textAlign: 'center',
        padding: '2rem',
        width: '100%',
        background: theme.palette.transparentWhite.main
    },
    container: {
        background: theme.palette.transparentWhite.main,
        height: '60vh',
        maxHeight: '100vh',
        minHeight: '60vh',
        width: '85%',
        padding: '0',
        margin: '0 2rem 2rem auto',
        border: 'black 5px solid',
        [theme.breakpoints.down('sm')]: {
            height: 'min-content',
            maxHeight: 'none',
            margin: '2rem auto 1rem auto',
        }
    },
    jobs: {
        overflowY: 'scroll',
        '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
        scrollbarWidth: 'none',  /* Firefox */
        '&::-webkit-scrollbar': { /* Chrome, Safari */
            display: 'none'
        }
    },
    searchForm: {
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'center',
        padding: theme.spacing(.25, 1)
    },
    input: {
        margin: theme.spacing(0, 1, 0, 0),
    },
    optionDisplay: {
        whiteSpace: 'nowrap'
    },
    search: {
        margin: theme.spacing(0) + 'auto',
        width: '100%',
        color: theme.palette.primary.main
    }
}));

const options = [
    'Choose Range In',
    '5',
    '10',
    '20',
    '30',
    '50'
]

export default function JobSearch({ handleSeeMore, jobListings, setJobListings }) {
    const classes = useStyles();
    const [zipCode, setZipCode] = useState("")
    const [range, setRange] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleZipChange = event => {
        setZipCode(event.target.value)
    }

    console.log('range', range)
    console.log('zipCode', zipCode)

    const handleZipSubmit = async (event) => {
        event.preventDefault()
        const apiKey = 'QYIPG6D4D5JL66A6D343'
        const apiCall = `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${range}&country=ALL&key=${apiKey}`

        try {
            const response = await fetch(apiCall)
            const results = await response.json()
            console.log('results', results.DataList)
            const zips = results.DataList.map(zip => parseInt(zip.Code))
            const zipString = zips.join(',')
            try {
                const response = await axios(`/api/jobs/available/${zipString}`)
                console.log('response', response.data)
                setJobListings(response.data)
            } catch (e) {
                console.log(e)
            }
        } catch (err) {
            console.log(err)
        }
        setZipCode("")
    }

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setRange(options[index]);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const jobCards = jobListings.map(job => {
        return <Card key={job._id} job={job} handleSeeMore={handleSeeMore} />
    })

    return (
        <Container className={classes.container}>
            <Typography className={classes.h2} variant='h2'>FIND A JOB</Typography>
            <form className={classes.searchForm}>
                <TextField
                    className={classes.input}
                    name="zipCode"
                    value={zipCode}
                    onChange={handleZipChange}
                    required
                    fullWidth
                    id="zipCode"
                    label="Zip Code"
                    autoFocus
                    placeholder="Enter a Zip Code"
                />
                <List component="nav" aria-label="Device settings">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="Range"
                        onClick={handleClickListItem}
                    >
                        <ListItemText className={classes.optionDisplay} primary={`${range} Miles`} />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === 0}
                            selected={index === 1}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option} Miles
                        </MenuItem>
                    ))}
                </Menu>
            </form>
            <Button className={classes.search} onClick={handleZipSubmit}>Submit</Button>
            <div className={classes.jobs}>
                {jobCards}
            </div>
        </Container>
    );
}
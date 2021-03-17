import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: '40%',
        minHeight: 400,
        margin: '0px 50px',
        border: 'solid thick black'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 30,
    },
    pos: {
        marginBottom: 12,
    },
});

const options = [
    'Choose Range In',
    '5',
    '10',
    '20',
    '30',
    '50'
]

export default function JobSearch() {
    const classes = useStyles();
    const [zipCode, setZipCode] = useState("")
    const [range, setRange] = useState("Range In");
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [jobListings, setJobListings] = useState([])

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

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} variant="h5" component="h1" style={{ textAlign: 'center' }}>
                    FIND JOBS
                    </Typography><br />
                <Typography style={{ display: 'flex' }}>
                    <TextField style={{ width: '70%' }}
                        // autoComplete="fname"
                        name="zipCode"
                        value={zipCode}
                        onChange={handleZipChange}
                        variant="outlined"
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
                            <ListItemText primary={`${range} Miles`} />
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
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option} Miles
                            </MenuItem>
                        ))}
                    </Menu>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" style={{ border: 'solid black', position: 'absolute', left: '18%', marginTop: '50px', padding: '5px 40px' }} onClick={handleZipSubmit}>Submit</Button>
            </CardActions>
        </Card>
    );
}
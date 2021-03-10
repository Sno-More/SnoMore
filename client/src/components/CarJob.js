import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 1000,
        margin: '50px 50px 50px 200px',
        
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CarJob({ carJob }) {
    console.log('carjob', carJob)
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const handleAcceptJob = () => {
        console.log('handleacceptjob')
        /*
        axios.put(`/api/?????/${id}`, {
            shoveler: {shoveler.id}
        })
        .then(response => {
            console.log(response)
        })
        .catch (e => {
            console.log(e)
        })
        */
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {/* {carJob.title} */}{bull}title here
            </Typography>
                <Typography variant="h5" component="h2">
                    {/* {carJob.address} */}{bull}address here
            </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {/* {carJob.rate} */}{bull}rate here
                    {/* {carJob.height} */}height here
            </Typography>
                <Typography variant="body2" component="p">
                    {/* {carJob.details} */}{bull}details here
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" style={{border:'solid black'}} onClick={handleAcceptJob}>Accept Job</Button>
            </CardActions>
        </Card>
    );
}

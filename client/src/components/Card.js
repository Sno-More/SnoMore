import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  card: {
    width: '75%',
    height: 'min-content',
    margin: theme.spacing(1) + 'auto',
    padding: theme.spacing(0),
    border: 'solid black 5px',
    backgroundColor: theme.palette.white.main
  },
  relativeContainer: {
    width: '100%',
  },
  seeMore: {
    margin: theme.spacing(.25, .25),
    height: '2rem',
    color: theme.palette.primary.main,
  },
  title: {
    margin: theme.spacing(.5, .5, .5, .5)
  },
  location: {
    margin: theme.spacing(.5, .5, .5, .5)
  }
}));

export default function SimpleCard({ job, handleSeeMore }) {
  const classes = useStyles();


  return (
    <div className={classes.card}>
        <Grid container>
          <Grid item md={8}>
            <Typography className={classes.title} variant='h5'>{job.title}  (${job.pay})</Typography>
            <Typography className={classes.location} variant='body1'>{job.location}</Typography>
          </Grid>
          <Grid justify='center' container item className={classes.relativeContainer} md={4}>
            <Button className={classes.seeMore} onClick={() => handleSeeMore(job._id)}>See more</Button>
          </Grid>
        </Grid>
    </div>
  )
}

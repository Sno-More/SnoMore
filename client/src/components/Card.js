import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  title: {
    fontSize: 30,
  },
  pos: {
    marginBottom: 12,

  },
  pay: {
    fontSize: '2rem'
  }
});

export default function SimpleCard({job, handleSeeMore}) {
  const classes = useStyles();

  
  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>{job.title}</Typography>
        <Typography variant='subtitle2'>Location: {job.location}</Typography>
        <div className={classes.pay}>Pay: {job.pay}</div>
        <button onClick={() => handleSeeMore(job._id)}>See more</button>
      </CardContent>
    </Card>
  )
}

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {
  Link
} from "react-router-dom";

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
        <Typography variant='subtitle2'>{job.location}</Typography>
        <div className={classes.pay}>{job.pay}</div>
        <button onClick={() => handleSeeMore(job._id)}>See more</button>
      </CardContent>
    </Card>
  )
}

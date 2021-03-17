import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        // '& > *': {
        //     margin: theme.spacing(1),
        //     width: '25ch',
        // },
        minWidth: 275,
    },

    title: {
        fontSize: 30,
    },
    pos: {
        marginBottom: 12,

    }
}));

export default function ShovelerDashboard() {
    return <div>Hello</div>
}

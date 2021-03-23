import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
    root: {
        width: 225,
        margin: theme.spacing(1)
    },
    bullet: {
        display: 'inline-block',
        // margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        textAlign: 'center'
    },
    snow: {
        border: 'solid ' + theme.palette.warning.main,
        borderRadius: '10px',
        padding: '0px 5px'
    },
    weather: {
        textAlign: 'center',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem'
        }
    }
}));

export default function Weather() {
    const classes = useStyles();
    const [weather, setWeather] = useState([])

    useEffect(() => {
        async function fetchWeather() {
            const apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&units=imperial&appid=da5a0b2df3ad3a18dae3207cc7ca31bf"

            try {
                const response = await fetch(apiCall)
                const results = await response.json()
                setWeather(results.daily)
            } catch (err) {
                console.log(err)
            }
        }
        fetchWeather()
    }, [])

    return (
        <div style={{ background: 'rgba(110, 97, 192, .85)', paddingBottom: '1.5rem' }}>
            <Typography className={classes.weather} style={{ textAlign: 'center', width: '100%', paddingTop: '2rem' }} variant='h2'>Weather Forecast</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 3rem', flexWrap: 'wrap' }}>
                {weather.length > 0 ? weather.map((daily, index) => (
                    <>
                        {index < 7 ?
                            <Card className={classes.root} variant="outlined" >
                                <CardContent>
                                    <Typography variant='h5' style={{ textAlign: 'center' }}>
                                        {moment().add(index, 'd').format("MM/DD/YYYY")}
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        <img style={{ width: '4rem' }} src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}.png`} alt='weather icon' />
                                    </Typography>
                                    <Typography variant="body1">
                                        {daily.weather[0].description === 'snow' ?
                                            <h3 className={classes.snow}>SNOW</h3>
                                            : <p style={{ textTransform: 'capitalize' }}>{daily.weather[0].description}</p>
                                        }
                                        <p>High Temp: {daily.temp.max}°</p>

                                    </Typography>
                                    <Typography color="textSecondary">
                                        Humidity: {daily.humidity}%
                                 </Typography>
                                </CardContent>
                            </Card>
                            : ""}
                    </>
                )) : ""}
            </div>
        </div>

    )

}
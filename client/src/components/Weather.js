import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

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
    },
    error: {
        color: theme.palette.warning.main
    }
}));

export default function Weather() {
    const classes = useStyles();
    const [weather, setWeather] = useState([])

    useEffect(() => {
        async function fetchWeather() {
            try {
                const ipJson = await fetch(`https://api.ipify.org?format=json`);
                const ip = await ipJson.json();
                const geocodeCall = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IP_GEOCODE_API_KEY}&ip=${ip.ip}`
                const latLongJson = await fetch(geocodeCall)
                const latLong = await latLongJson.json();
                let lat = latLong.latitude
                let lon = latLong.longitude

                const weatherApiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
                const response = await fetch(weatherApiCall)
                const results = await response.json()
                console.log(results);
                setWeather(results.daily)
            } catch (err) {
                console.log(err)
            }
        }
        fetchWeather()
        // console.log(weather)
    }, [])

    return (
        <div style={{ background: 'rgba(110, 97, 192, .85)', paddingBottom: '1.5rem' }}>
            <Typography className={classes.weather} style={{ textAlign: 'center', width: '100%', paddingTop: '2rem' }} variant='h2'>Weather Forecast</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 3rem', flexWrap: 'wrap' }}>
                {weather?.length > 0 ? weather.map((daily, index) => (
                    <div key={index}>
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
                                        {daily.weather[0].description.includes('snow') ?
                                            <p style={{ border: 'solid red', borderRadius: '10px', textAlign: 'center', backgroundColor: 'yellow', textTransform: 'capitalize' }}>{daily.weather[0].description}</p>
                                            : <p style={{ textTransform: 'capitalize' }}>{daily.weather[0].description}</p>
                                        }
                                        <p>High Temp: {Math.round(daily.temp.max)}°</p>

                                    </Typography>
                                    <Typography color="textSecondary">
                                        Humidity: {daily.humidity}%
                                 </Typography>
                                </CardContent>
                            </Card>
                            : ""}
                    </div>
                )) : <Typography variant='h5' className={classes.error}>An error occured while fetching weather...</Typography>}
            </div>
        </div>

    )

}
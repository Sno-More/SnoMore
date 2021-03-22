import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import "../css/header.css"


const useStyles = makeStyles((theme) => ({
    root: {
        // minWidth: 50,
        maxHeight: 100,
        marginTop: -10,
        // borderRadius: '50px',
    },
    weather: {
        backgroundColor: theme.palette.primary.main
    },
    bullet: {
        display: 'inline-block',
        // margin: '0 2px',
        transform: 'scale(0.8)',
    },
    date: {
        fontSize: 12
    },
    title: {
        fontSize: 10,
    },
    pos: {
        fontSize: 10,
        // marginBottom: 8,
    },
}))

export default function Weather() {
    const classes = useStyles();
    const [weather, setWeather] = useState([])

    useEffect(() => {
        async function fetchWeather() {
            const lat = '41'
            const lon = '-87'
            const apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=da5a0b2df3ad3a18dae3207cc7ca31bf`

            try {
                const response = await fetch(apiCall)
                const results = await response.json()
                console.log('results', results)
                setWeather(results.daily)
            } catch (err) {
                console.log(err)
            }
        }
        fetchWeather()
    }, [])

    return (
        <div className={classes.weather, "weather"} style={{ background: 'white', display: 'flex' }}>

            {weather.length > 0 ? weather.map((daily, index) => (
                <>
                    {index < 7 ?
                        <div className={classes.root} variant="outlined" >
                            <CardContent>
                                <Typography className={classes.date}>
                                    <img src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}.png`} alt='weather icon' style={{ width: '25%', height: '25%', margin: '-10px -3px -10px 0px' }} />  {moment().add(index, 'd').format("MM/DD")}
                                </Typography>
                                <Typography className={classes.title} variant="h5" component="h2">
                                    {daily.weather[0].description.includes('snow') ?
                                        <p style={{ border: 'solid red', borderRadius: '10px', textAlign: 'center', backgroundColor: 'yellow' }}>{daily.weather[0].description}</p>
                                        : <p>{daily.weather[0].description}</p>
                                    }
                                    High: {daily.temp.max}°
                                    Humidity: {daily.humidity}%
                                </Typography>
                            </CardContent>
                        </div>
                        : ""}
                </>
            )) : ""}
        </div>
    )

}
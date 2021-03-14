import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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

export default function Weather() {
    const classes = useStyles();
    const [weather, setWeather] = useState([])

    useEffect(() => {
        async function fetchWeather() {
            const apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&units=imperial&appid=da5a0b2df3ad3a18dae3207cc7ca31bf"

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
        <div style={{ background: 'white', display: 'flex' }}>

            {weather.length > 0 ? weather.map((daily, index) => (
                <>
                    {index < 7 ?
                        <Card className={classes.root} variant="outlined" style={{ margin: '0px 10px' }}>
                            <CardContent>
                                <Typography>
                                    {moment().add(index, 'd').format("MM/DD/YYYY")}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    <img src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`} />
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <p>High temp: {daily.temp.max}°</p>
                                    <p>{daily.weather[0].description}</p>
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Humidity: {daily.humidity}%
                                 </Typography>
                            </CardContent>
                        </Card>
                        : ""}
                </>
            )) : ""}
        </div>
    )

}
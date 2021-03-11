import React from 'react'
import Card from './Card';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));



function ShovelerProfile() {
    const classes = useStyles();
    const handleSaveCity = (event) => {
        event.preventDefault()
        console.log('find city')


    }

    return (

        <>
        
            <Grid md={5}>
                {/* {{marginTop:"360px"}} */}
                <Container style={{backgroundColor:"white", marginLeft:"20px"}}>
                    <h1 style={{ textAlign: "center" , color: "#6E61C0"}}>Find Jobs</h1>
                    <form onSubmit={handleSaveCity}>
   
                        <form className={classes.root} noValidate autoComplete="off" style={{ color: "white" }}>
                            <TextField id="standard-basic" label="Search your City" />
                        </form>
                        <input style= {{marginBottom: "20px"}}
                            type="submit"
                            value="Search" />

                    </form>
                </Container>


                {/* google maps api here */}
            </Grid>

            <Grid md={6} style={{ textAlign: "center", marginLeft: "700px", marginTop: "-184.5px" }}>
                <Container style={{backgroundColor:"white"}}>
                <h1 style={{color: "#6E61C0"}}>Upcoming Jobs</h1>
                {/* lists the shoveler's upcoming jobs  */}
                <Card></Card>
                <Card></Card>
                <Card></Card>

                </Container>
            </Grid>

        </>
    )
}

export default ShovelerProfile

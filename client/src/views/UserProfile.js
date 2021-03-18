import React from 'react'
// import Card from "../components/Card"
import Container from '@material-ui/core/Container';

function UserProfile() {
    return (
        <div >
            <Container  style={{backgroundColor:"white"}}>
            <h1 style={{ color: "purple", textAlign:"center"}}>Your Job Posting</h1>
            <div>
                <h2 style={{ textDecorationLine: "underline"}}>In Progress</h2>
                {/* <Card></Card> */}

                <h2 style={{ textDecorationLine: "underline"}}>Completed</h2>
                {/* <Card></Card> */}
            </div>
            </Container>
            
        </div>
    )
}

export default UserProfile

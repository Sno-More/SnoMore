import React from 'react'
import Card from "./Card"

function UserProfile() {
    return (
        <div >
            <h1 style={{ color: "white" }}>Your Job Posting</h1>
            <div>
                <h2 style={{ textDecorationLine: "underline", color: "white" }}>In Progress</h2>
                <Card></Card>

                <h2 style={{ textDecorationLine: "underline", color: "white" }}>Completed</h2>
                <Card></Card>
            </div>
            
        </div>
    )
}

export default UserProfile

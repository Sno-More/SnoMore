import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function DrivewayPostForm() {

  const [driveway, setDriveway] = useState({ title: "", location: "", pay: "", description: "", date: "", complete: "", type: "driveway" })

  const handleDrivewayTitle = (event) => {
    setDriveway({ ...driveway, title: event.target.value })
  }
  const handleDrivewayAddress = (event) => {
    setDriveway({ ...driveway, location: event.target.value })
  }
  const handleDrivewayRate = (event) => {
    setDriveway({ ...driveway, pay: event.target.value })
  }
  const handleDrivewayDescription = (event) => {
    setDriveway({ ...driveway, description: event.target.value })
  }
  const handleDrivewayDate = (event) => {
    setDriveway({ ...driveway, date: event.target.value })
  }


  useEffect(() => console.log('driveway', driveway))

  const handleDrivewaySubmit = (event) => {
    event.preventDefault()
    console.log('post object', driveway)
    // axios post to database
    // axios.post('/api/driveways', driveway)

  }

  return (
    <>
      <h3>DRIVEWAY SHOVEL</h3>
      <form onSubmit={handleDrivewaySubmit}>
        <input
          type="text"
          value={driveway.drivewayTitle}
          onChange={handleDrivewayTitle}
          placeholder='Title' /><br />
        <input
          type="text"
          value={driveway.drivewayAddress}
          onChange={handleDrivewayAddress}
          placeholder='Address' /><br />
        <input
          type="text"
          value={driveway.drivewayRate}
          onChange={handleDrivewayRate}
          placeholder='Rate' /><br />
        <input
          type="text"
          value={driveway.drivewayDetails}
          onChange={handleDrivewayDescription}
          placeholder='Details' /><br />
        <input
          type="text"
          value={driveway.drivewayComplete}
          onChange={handleDrivewayDate}
          placeholder='Date must be completed by' /><br />
        <Link to="/shovelerprofile">
          <input
            type="submit"
            value="Submit" />
        </Link>

      </form>
    </>
  )
}
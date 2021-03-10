import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function DrivewayPostForm () {

    const [driveway, setDriveway] = useState({ drivewayTitle: "", drivewayAddress: "", drivewayHeight: "", drivewayRate: "", drivewayDetails: "" })

    const handleDrivewayTitle = (event) => {
      setDriveway({ ...driveway, drivewayTitle: event.target.value })
    }
    const handleDrivewayAddress = (event) => {
      setDriveway({ ...driveway, drivewayAddress: event.target.value })
    }
    const handleDrivewayHeight = (event) => {
      setDriveway({ ...driveway, drivewayHeight: event.target.value })
    }
    const handleDrivewayRate = (event) => {
      setDriveway({ ...driveway, drivewayRate: event.target.value })
    }
    const handleDrivewayDetails = (event) => {
      setDriveway({ ...driveway, drivewayDetails: event.target.value })
    }
  
    useEffect(() => console.log('driveway', driveway))
  
    const handleDrivewaySubmit = (event) => {
      event.preventDefault()
      console.log('post object', driveway)
      // axios post to database
      // axios.post('/api/driveways', driveway)
  
    }

    return(
        <>
        <h3>DRIVEWAY SHOVEL</h3>
        <form onSubmit={handleDrivewaySubmit}>
        <input
            type="text"
            value={driveway.drivewayTitle}
            onChange={handleDrivewayTitle}
            placeholder='Title' /><br/>
            <input
            type="text"
            value={driveway.drivewayAddress}
            onChange={handleDrivewayAddress}
            placeholder='Address' /><br/>
            <input
            type="text"
            value={driveway.drivewayHeight}
            onChange={handleDrivewayHeight}
            placeholder='Approximate height of snow' /><br/>
            <input
            type="text"
            value={driveway.drivewayRate}
            onChange={handleDrivewayRate}
            placeholder='Rate'/><br/>
            <input
            type="text"
            value={driveway.drivewayDetails}
            onChange={handleDrivewayDetails}
            placeholder='Details'/><br/>
            <input
            type="submit"
            value="Submit" />
        </form>
        </>
    )
}
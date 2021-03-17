import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Link
} from "react-router-dom";
// import UserProfile from './UserProfile'
import Button from '@material-ui/core/Button';

export default function CarPostForm() {

  const [car, setCar] = useState({ title: "", location: "", zipCode: "", pay: "", description: "", date: "", type: "car" })

  const handleCarTitle = (event) => {
    setCar({ ...car, title: event.target.value })
  }
  const handleCarAddress = (event) => {
    setCar({ ...car, location: event.target.value })
  }
  const handleCarZip = (event) => {
    setCar({ ...car, zipCode: event.target.value })
  }
  const handleCarPay = (event) => {
    setCar({ ...car, pay: event.target.value })
  }
  const handleCarDescription = (event) => {
    setCar({ ...car, description: event.target.value })
  }
  const handleCarDate = (event) => {
    setCar({ ...car, date: event.target.value })
  }


  useEffect(() => console.log('car', car))

  const handleCarSubmit = (event) => {
    event.preventDefault()
    console.log('post object', car)

    // axios post to database
    axios.post('/api/jobs', car)

  }

  return (
    <>
      <h3>CAR SHOVEL</h3>
      <form>
        <input
          type="text"
          value={car.title}
          onChange={handleCarTitle}
          placeholder='Title' /><br />
        <input
          type="text"
          value={car.address}
          onChange={handleCarAddress}
          placeholder='Address' /><br />
        <input
          type="text"
          value={car.zip}
          onChange={handleCarZip}
          placeholder='5-digit Zip Code' /><br />
        <input
          type="text"
          value={car.pay}
          onChange={handleCarPay}
          placeholder='Rate' /><br />
        <input
          type="text"
          value={car.description}
          onChange={handleCarDescription}
          placeholder='Details' /><br />
        <input
          type="text"
          value={car.date}
          onChange={handleCarDate}
          placeholder='Date must be completed by' /><br />
        <Link to='/userprofile'>
          <Button onClick={handleCarSubmit} style={{border:'solid black'}}>Submit</Button>
        </Link>

      </form>
    </>
  )
}
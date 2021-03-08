import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function CarPostForm () {

    const [car, setCar] = useState({ carTitle: "", carAddress: "", carHeight: "", carRate: "", carDetails: "" })

    const handleCarTitle = (event) => {
      setCar({ ...car, carTitle: event.target.value })
    }
    const handleCarAddress = (event) => {
      setCar({ ...car, carAddress: event.target.value })
    }
    const handleCarHeight = (event) => {
      setCar({ ...car, carHeight: event.target.value })
    }
    const handleCarRate = (event) => {
      setCar({ ...car, carRate: event.target.value })
    }
    const handleCarDetails = (event) => {
      setCar({ ...car, carDetails: event.target.value })
    }
  
    useEffect(() => console.log('car', car))
  
    const handleCarSubmit = (event) => {
      event.preventDefault()
      console.log('post object', car)
      // axios post to database
      // axios.post('/api/cars', car)
  
    }

    return(
        <>
        <h3>CAR SHOVEL</h3>
        <form onSubmit={handleCarSubmit}>
            <input
            type="text"
            value={car.carTitle}
            onChange={handleCarTitle}
            placeholder='Title' /><br/>
            <input
            type="text"
            value={car.carAddress}
            onChange={handleCarAddress}
            placeholder='Address' /><br/>
            <input
            type="text"
            value={car.carHeight}
            onChange={handleCarHeight}
            placeholder='Approximate height of snow' /><br/>
            <input
            type="text"
            value={car.carRate}
            onChange={handleCarRate}
            placeholder='Rate'/><br/>
            <input
            type="text"
            value={car.carDetails}
            onChange={handleCarDetails}
            placeholder='Details'/><br/>
            <input
            type="submit"
            value="Submit" />
        </form>
        </>
    )
}
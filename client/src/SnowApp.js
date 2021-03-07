import React, { useState, useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import JobPostForm from './components/JobPostForm'
import axios from 'axios'

export default function SnowApp() {
  const [car, setCar] = useState({ carAddress: "", carHeight: "", carRate: "" })

  const handleCarAddress = (event) => {
    setCar({ ...car, carAddress: event.target.value })
  }
  const handleCarHeight = (event) => {
    setCar({ ...car, carHeight: event.target.value })
  }
  const handleCarRate = (event) => {
    setCar({ ...car, carRate: event.target.value })
  }

  useEffect(() => console.log('car', car))

  const handleCarSubmit = (event) => {
    event.preventDefault()
    console.log('post object', car)
    // axios post to database
    // axios.post('/api/cars', car)

  }



  return (
    <div className="app">
      <Router>
        <Route path="/login">
          <Header />
          <LogIn />
        </Route>
        <Route path="/signup">
          <Header />
          <SignUp />
        </Route>
        <Route path="/jobpost">
          <JobPostForm 
          handleCarAddress={handleCarAddress}
          handleCarHeight={handleCarHeight}
          handleCarRate={handleCarRate}
          handleCarSubmit={handleCarSubmit}
          />
        </Route>
        <Switch>
          <Route exact path="/">
            <Header />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

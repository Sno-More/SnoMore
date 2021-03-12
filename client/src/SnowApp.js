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
import ShovelerNewsFeed from './components/ShovelerNewsFeed'
import Job from './components/Job'
import axios from 'axios'
import ShovelerDashboard from "./components/ShovelerDashboard"
import UserProfile from "./components/UserProfile"
import MyJob from './components/MyJob'
import { JobContext } from './JobContext'

export default function SnowApp() {

  const [jobListings, setJobListings] = useState([])
  const [job, setJob] = useState({})

  //fetch available jobs
  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios('/api/jobs/available')
        console.log('response', response.data)
        setJobListings(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchJobs()
  }, [])

  //see more button on shoveler job feed
  function handleSeeMore(id) {
    //find car in db with matching id
    const foundPost = jobListings.find(job => job._id === id)
    console.log('found post', foundPost)
    //send that job to corresponding route
    setJob(foundPost)
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/jobpost">
            <JobPostForm />
          </Route>
          <Route path="/shovelerfeed/">
            <ShovelerNewsFeed
              jobListings={jobListings}
              setJobListings={setJobListings}
              job={job}
              setJob={setJob}
            />
          </Route>
          <Route path="/job/:id">
            <Job
              job={job}
              jobListings={jobListings}
              setJobListings={setJobListings}
            />
          </Route>
          <Route exact path="/shovelerdashboard">
            <ShovelerDashboard />
          </Route>
          <Route exact path="/userprofile">
            <UserProfile />
          </Route>
          <Route exact path="/myjob/:id">
              <MyJob
                // myJobs={myJobs}
                // setMyJobs={setMyJobs}
                // currentJob={currentJob}
                // setCurrentJob={setCurrentJob}
                // handleSeeMoreMyJob={handleSeeMoreMyJob}
              />
          </Route>
          <Route exact path="/">
            <LogIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

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
import {jobData} from './data/jobdata'
import ShovelerProfile from "./components/ShovelerProfile"
import UserProfile from "./components/UserProfile"

export default function SnowApp() {

  const [jobListings, setJobListings] = useState(jobData)
  const [job, setJob] = useState({})

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios('/api/jobs')
        console.log('response', response.data)
        setJobListings(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchJobs()
  }, [])

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
              handleSeeMore = {handleSeeMore}
            />
          </Route>
          <Route path="/job">
            <Job
            job={job}
            jobListings={jobListings}
            setJobListings = {setJobListings}
            />
          </Route>
          <Route exact path="/">
            <LogIn />
          </Route>
          <Route exact path="/shovelerprofile">
            <ShovelerProfile />
          </Route>
          <Route exact path="/userprofile">
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

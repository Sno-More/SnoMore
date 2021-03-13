import React, { useState, useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import axios from 'axios'


export default function SnowApp() {

  const [jobListings, setJobListings] = useState([])
  const [job, setJob] = useState({})

  const [myJob, setMyJob] = useState([])

  // //fetch available jobs
  // useEffect(() => {
  //   async function fetchJobs() {
  //     try {
  //       const response = await axios('/api/jobs/available')
  //       console.log('response', response.data)
  //       setJobListings(response.data)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   fetchJobs()
  // }, [])

  // //see more button on shoveler job feed
  // function handleSeeMore(id) {
  //   //find car in db with matching id
  //   const foundPost = jobListings.find(job => job._id === id)
  //   console.log('found post', foundPost)
  //   //send that job to corresponding route
  //   setJob(foundPost)
  // }

  // //shoveler dashboard
  // useEffect(() => {
  //   async function fetchMyJobs() {
  //     try {
  //       const response = await axios('/api/user/jobs')
  //       setMyJobs(response.data.jobs.filter(jobs => jobs.complete === false))
  //       setMyCompleteJobs(response.data.jobs.filter(jobs => jobs.complete === true))
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   // const getJobs = myJobs.length > 0 ? fetchMyJobs() : ""
  //   fetchMyJobs()
  // }, [])

  // useEffect(() => {
  //   console.log('my jobs', myJobs)
  // })

  // function handleSeeMoreMyJob(id) {
  //   const foundMyJob = myJobs.find(job => job._id === id)
  //   console.log('foundmyjob', foundMyJob)
  //   setMyJob(foundMyJob)
  // }

  return (
    <Router>
      <div className="app">
        {/* <Header />
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
            <ShovelerFeed
              jobListings={jobListings}
              setJobListings={setJobListings}
              job={job}
              setJob={setJob}
              handleSeeMore={handleSeeMore}
            />
          </Route>
          <Route path="/job/:id">
            <Job
              job={job}
              jobListings={jobListings}
              setJobListings={setJobListings}
            />
          </Route>
          <Route path="/shovelerdashboard">
            <ShovelerDashboard
              myJobs={myJobs}
              myCompleteJobs={myCompleteJobs}
              myJob={myJob}
              handleSeeMoreMyJob={handleSeeMoreMyJob}
            />
          </Route>
          <Route path="/userprofile">
            <UserProfile />
          </Route>
          <Route path="/myjob/:id">
            <MyJob
              myJobs={myJobs}
              setMyJobs={setMyJobs}
              myJob={myJob}
            // setCurrentJob={setCurrentJob}
            // handleSeeMoreMyJob={handleSeeMoreMyJob}
            />
          </Route>
          <Route exact path="/">
            <LogIn />
          </Route>
        </Switch> */}
        <Switch>
          <Route exact path='/'>
            <Welcome />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

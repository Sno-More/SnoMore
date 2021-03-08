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

export default function SnowApp() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/jobpost">
          <JobPostForm />
        </Route>
        <Route path="/shovelerfeed">
          <ShovelerNewsFeed />
        </Route>
        <Switch>
          <Route exact path="/">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

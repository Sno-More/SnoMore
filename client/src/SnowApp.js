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

export default function SnowApp() {
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
          <Header />
          <JobPostForm 
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

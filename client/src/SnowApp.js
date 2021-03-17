import React, { useState} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';


export default function SnowApp() {

  return (
    <Router>
      <div className="app">
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

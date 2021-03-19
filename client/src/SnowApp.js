import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './utils/theme';


export default function SnowApp() {

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </React.Fragment>
  );
}

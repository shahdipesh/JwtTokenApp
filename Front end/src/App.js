import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import Login from './components/Login/login.component';
import Header from './components/Header/header.component';
import Features from './components/Features/features.component';
import { useSelector } from 'react-redux'

function App() {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn)
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/features" exact> <Features /></Route>
        <Route exact path="/login">
          {isUserLoggedIn ? <Redirect to="/features" /> : <Login />}
        </Route>
      </div>
    </Router>
  );
}

export default App;

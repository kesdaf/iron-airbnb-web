import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import AuthenticatedRoute from './components/misc/AuthenticatedRoute';
import Login from './components/misc/Login';
import NavBar from './components/misc/NavBar';
import { Register } from './components/misc/Register';



function App() {
  return (
<div className="App">
  <NavBar/>
  <Switch>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <AuthenticatedRoute exact path="/">
      Home
    </AuthenticatedRoute>
    <Redirect to="/"/>
  </Switch>
</div>
  );
}

export default App;

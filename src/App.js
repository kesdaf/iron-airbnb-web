import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import AuthenticatedRoute from './components/misc/AuthenticatedRoute';
import IsOwnerRoute from './components/misc/IsOwnerRoute';
import Login from './components/misc/Login';
import NavBar from './components/misc/NavBar';
import { Register } from './components/misc/Register';
import { WithAuthConsumer } from './contexts/AuthContext';
import OwnerMenu from './components/owner/OwnerMenu';
import AddLocation from './components/location/AddLocation';
import MyLocations from './components/location/MyLocations';
import UserMenu from './components/user/userMenu';
import IsUserRoute from './components/misc/IsUserRoute';
import FindLocation from './components/location/FindLocation';

function App(props) {
  let home = ''
  if (props.currentUser) {

    if (props.currentUser.type == 'owner') {
      home = <OwnerMenu/>
    } else {
      home = <UserMenu/>
    }
  }
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthenticatedRoute exact path="/">
          {home}
        </AuthenticatedRoute>
        <IsOwnerRoute exact path="/AddLocal" component={AddLocation}/>
        <IsOwnerRoute exact path="/MyLocals" component={MyLocations}/>
        <IsUserRoute exact path="/FindLocal" component={FindLocation}/>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default WithAuthConsumer(App);

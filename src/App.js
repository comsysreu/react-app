import './App.css';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import User from './pages/users/users';
import Register from './pages/register/register';
import Profile from './pages/profiles/profile';
import { ToastContainer } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";

const CloseButton = ({ closeToast }) => <i onClick={closeToast} className="la la-close notifications-close" />

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton />}
        />
        <NavBar></NavBar>
        <Switch>
          <Route path="/users" exact component={User} />
          <Route path="/register" exact component={Register} />
          <Route path="/profiles" exact component={Profile} />
          <Redirect from="*" to="/register" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/profileActions';

import PrivateRoute from './components/Global/PrivateRoute';
import NotFound from './components/Pages/NotFound';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignUp from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Dashboard from './components/Panel/Dashboard/Dashboard';
import Profile from './components/Panel/Profile/Profile';

import './main.css';

// TODO move to own file
import axios from 'axios';
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};


// check token
if (localStorage.access_token) {
    setAuthToken(localStorage.access_token);
    const user = jwt_decode(localStorage.access_token);
    store.dispatch(setCurrentUser(user));

    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <PrivateRoute exact path="/panel" component={Dashboard} />
                        <PrivateRoute path="/panel/profile" component={Profile} />
                        <Route component={NotFound} />
                    </Switch>    
                </Router>  
            </Provider>     
        );
    }
}

export default App;

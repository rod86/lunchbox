import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/profileActions';

import NotFound from './Components/Pages/NotFound';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import SignUp from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import Logout from './Components/Auth/Logout';
import Dashboard from './Components/Panel/Dashboard/Dashboard';
import PrivateRoute from './Components/Global/PrivateRoute';

import './main.css';


// check token
if (localStorage.access_token) {
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
                        <Route component={NotFound} />
                    </Switch>    
                </Router>  
            </Provider>     
        );
    }
}

export default App;

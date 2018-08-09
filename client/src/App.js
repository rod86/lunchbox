import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { setCurrentUser, logoutUser } from './actions/profileActions';
import { decodeToken, getTokenFromStorage, setAuthToken, isExpiredToken } from './libs/Token';

import PrivateRoute from './components/Global/PrivateRoute';
import NotFound from './components/Pages/NotFound';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import SignUp from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import MyStands from './components/MyStands/MyStands';

import './assets/styles/main.scss';

// check token
const token = getTokenFromStorage();
if (token) {
    const user = decodeToken(token);
    store.dispatch(setCurrentUser(user));
    setAuthToken(token);

    if (isExpiredToken(token)) {
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
                        <PrivateRoute path="/panel/stands" component={MyStands} />
                        <Route component={NotFound} />
                    </Switch>    
                </Router>  
            </Provider>     
        );
    }
}

export default App;

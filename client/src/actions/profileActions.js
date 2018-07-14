import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types';
import jwt_decode from 'jwt-decode';

export const createUser = (user, history) => dispatch => {
    axios.post('/api/profile', user)
        .then(() => history.push('/login'))
        .catch(err => dispatch({ type: GET_ERRORS, payload: { errors: err.response.data.errors } }));
};

export const loginUser = (user) => dispatch => {
    axios.post('/api/auth', user)
        .then(res => {
            dispatch({ type: CLEAR_ERRORS });
            const { token } = res.data;
            localStorage.setItem('access_token', token);
            const user = jwt_decode(token);
            dispatch(setCurrentUser(user));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: { description: 'Invalid username and/or password' } }));
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('access_token');
    dispatch(setCurrentUser({}));
};

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});
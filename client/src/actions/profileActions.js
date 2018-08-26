import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS, GET_PROFILE, PROFILE_LOADING } from './types';
import { storeToken, decodeToken, removeTokenFromStorage, setAuthToken } from '../libs/Token';
import { success, removeAll } from 'react-notification-system-redux';

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
            storeToken(token);
            setAuthToken(token);
            const user = decodeToken(token);
            dispatch(setCurrentUser(user));
        })
        .catch(() => dispatch({ type: GET_ERRORS, payload: { description: 'Invalid username and/or password' } }));
};

export const logoutUser = () => dispatch => {
    removeTokenFromStorage();
    dispatch(setCurrentUser({}));
};

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const setProfileLoading = () => ({
    type: PROFILE_LOADING
});

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
        .catch(() => dispatch({ type: GET_PROFILE, payload: {} }));
};

export const updatePassword = data => dispatch => {
    axios.put('/api/profile/password', data)
        .then(() => {
            dispatch({ type: CLEAR_ERRORS });
            dispatch(success({
                message: 'Your password has been changed.',
                autoDismiss: 5,
                position: 'tr'
            }));
        })
        .catch(err => {
            dispatch({ type: GET_ERRORS, payload: { errors: err.response.data.errors } });
        });
};

export const deleteProfile = history => dispatch => {
    axios.delete('/api/profile')
        .then(() => {
            removeTokenFromStorage();
            dispatch(setCurrentUser({}));
            history.push('/login');
        })
        .catch(() => dispatch({ type: GET_ERRORS, payload: { description: 'Error deleting your account' } }));
};
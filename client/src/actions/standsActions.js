import axios from 'axios';
import { GET_PROFILE_STANDS, STANDS_LOADING, GET_STAND, DELETE_STAND, GET_ERRORS, CLEAR_ERRORS } from './types';
import { success, error, removeAll } from 'react-notification-system-redux';

export const setStandsLoading = () => ({
    type: STANDS_LOADING
});

export const getProfileStands = () => dispatch => {
    dispatch(setStandsLoading());
    axios.get('/api/profile/stands')
        .then(res => dispatch({ type: GET_PROFILE_STANDS, payload: res.data }))
        .catch(() => dispatch({ type: GET_PROFILE_STANDS, payload: [] }));
};

export const getStand = id => dispatch => {
    dispatch(setStandsLoading());
    axios.get(`/api/stands/${id}`)
        .then(res => dispatch({ type: GET_STAND, payload: res.data }))
        .catch(() => dispatch({ type: GET_STAND, payload: null }));
};

export const createStand = (stand, history) => dispatch => {
    axios.post('/api/stands', stand)
        .then(() => {
            dispatch({ type: CLEAR_ERRORS });
            history.push('/panel/stands');
            dispatch(success({
                message: 'Your stand was created successfully.',
                autoDismiss: 5,
                position: 'tr'
            }));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: { errors: err.response.data.errors } }));
};

export const updateStand = (id, stand, history) => dispatch => {
    axios.put(`/api/stands/${id}`, stand)
        .then(() => {
            dispatch({ type: CLEAR_ERRORS });
            history.push('/panel/stands');
            dispatch(success({
                message: 'Your stand was updated successfully.',
                autoDismiss: 5,
                position: 'tr'
            }));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: { errors: err.response.data.errors } }));
};

export const deleteStand = id => dispatch => {
    axios.delete(`/api/stands/${id}`)
        .then(() => {
            dispatch({ type: DELETE_STAND, payload: id })
            dispatch(success({
                message: 'Your stand was deleted successfully.',
                autoDismiss: 5,
                position: 'tr'
            }));
        })
        .catch(err => {
            dispatch(error({
                message: 'An error ocurred while deleting the stand.',
                autoDismiss: 5,
                position: 'tr'
            }));
        });
};
import axios from 'axios';
import { SEARCH_LOADING, SEARCH_GET_RESULTS } from './types';
import { success, error, removeAll } from 'react-notification-system-redux';

export const setSearchLoading = () => ({
    type: SEARCH_LOADING
});

export const searchStands = location => dispatch => {
    dispatch(setSearchLoading());
    axios.get(`/api/geolocation/address?address=${location}`)
        .then(response => {
            const { longitude, latitude } = response.data;
            return axios.get(`/api/stands/search?lat=${latitude}&lng=${longitude}`);
        })
        .then(response => dispatch({ type: SEARCH_GET_RESULTS, payload: response.data }))
        .catch(err => {
            dispatch(error({
                message: 'An error ocurred while searching stands.',
                autoDismiss: 5,
                position: 'tr'
            }));
            dispatch({ type: SEARCH_GET_RESULTS, payload: []});
        });
};
import { getCurrentLocation } from '../libs/geolocation';
import { GET_USER_POSITION, USER_POSITION_LOADING } from './types';
import { error } from 'react-notification-system-redux';

export const setUserPositionLoading = isLoading => ({
    type: USER_POSITION_LOADING,
    payload: isLoading
});

export const getUserPosition = () => dispatch => {
    dispatch(setUserPositionLoading(true));
    getCurrentLocation()
        .then(position => dispatch({ type: GET_USER_POSITION, payload: position }))
        .catch(err => {
            dispatch(setUserPositionLoading(false));
            dispatch(error({
                message: err,
                autoDismiss: 5,
                position: 'tr'
            }));
        });
};
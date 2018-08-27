import { getUserLocation, getCoordinatesFromAddress } from '../libs/geolocation';
import { GET_USER_POSITION, USER_POSITION_LOADING, GET_ADDRESS_POSITION, ADDRESS_POSITION_LOADING } from './types';
import { error } from 'react-notification-system-redux';

export const setUserPositionLoading = isLoading => ({
    type: USER_POSITION_LOADING,
    payload: isLoading
});

export const setAddressPositionLoading = isLoading => ({
    type: ADDRESS_POSITION_LOADING,
    payload: isLoading
});

export const getUserPosition = () => dispatch => {
    dispatch(setUserPositionLoading(true));
    getUserLocation()
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

export const getAddressPosition = address => dispatch => {
    dispatch(setAddressPositionLoading(true));
    getCoordinatesFromAddress(address)
        .then(position => dispatch({ type: GET_ADDRESS_POSITION, payload: position }))
        .catch(err => {
            dispatch(setAddressPositionLoading(false));
            dispatch(error({
                message: 'Error getting coordinates from your address.',
                autoDismiss: 5,
                position: 'tr'
            }));
        });
};
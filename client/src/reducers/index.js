import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import standsReducer from './standsReducer';
import geolocationReducer from './geolocationReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer,
    stands: standsReducer,
    geolocation: geolocationReducer,
    notifications
});
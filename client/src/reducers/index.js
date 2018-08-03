import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import {reducer as notifications} from 'react-notification-system-redux';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer,
    notifications
});
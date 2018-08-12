import axios from 'axios';
import { GET_PROFILE_STANDS, STANDS_LOADING } from './types';

export const setStandsLoading = () => ({
    type: STANDS_LOADING
});

export const getProfileStands = () => dispatch => {
    dispatch(setStandsLoading());
    axios.get('/api/profile/stands')
        .then(res => dispatch({ type: GET_PROFILE_STANDS, payload: res.data }))
        .catch(() => dispatch({ type: GET_PROFILE_STANDS, payload: [] }));
};
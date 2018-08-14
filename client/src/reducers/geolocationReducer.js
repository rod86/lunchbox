import { GET_USER_POSITION, USER_POSITION_LOADING } from '../actions/types';

const initialState = {
    loading: false,
    coordinates: {
        latitude: null,
        longitude: null
    }
};

export default (state=initialState, action) => {
    switch (action.type) {
        case USER_POSITION_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case GET_USER_POSITION:
            return {
                ...state,
                loading: false,
                coordinates: {
                    latitude: action.payload.latitude || null,
                    longitude: action.payload.longitude || null
                }
            };
        default:
            return state;
    }
};
import { GET_USER_POSITION, USER_POSITION_LOADING, GET_ADDRESS_POSITION, ADDRESS_POSITION_LOADING } from '../actions/types';

const initialState = {
    userPosition: {
        loading: false,
        latitude: null,
        longitude: null
    },
    addressPosition: {
        loading: false,
        latitude: null,
        longitude: null
    }
};

export default (state=initialState, action) => {
    switch (action.type) {
        case USER_POSITION_LOADING:
            return {
                ...state,
                userPosition: {
                    loading: true
                }
            };
        case GET_USER_POSITION:
            return {
                ...state,
                userPosition: {
                    loading: false,
                    latitude: action.payload.latitude || null,
                    longitude: action.payload.longitude || null
                }
            };
        case ADDRESS_POSITION_LOADING:
            return {
                ...state,
                addressPosition: {
                    loading: true
                }
            };    
        case GET_ADDRESS_POSITION:
            return {
                ...state,
                addressPosition: {
                    loading: false,
                    latitude: action.payload.latitude || null,
                    longitude: action.payload.longitude || null
                }
            };
        default:
            return state;
    }
};
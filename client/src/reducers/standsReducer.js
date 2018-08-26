import { STANDS_LOADING, GET_PROFILE_STANDS, GET_STAND } from '../actions/types';

const initialState = {
    stands: [],
    loading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case STANDS_LOADING: 
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE_STANDS:
            return {
                ...state,
                loading: false,
                stands: action.payload
            };
        case GET_STAND:
            return {
                ...state,
                loading: false,
                stand: action.payload
            };    
        default:
            return state;
    }
}
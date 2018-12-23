import { SEARCH_LOADING, SEARCH_GET_RESULTS } from '../actions/types';

const initialState = {
    loading: false,
    results: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_LOADING: 
            return {
                ...state,
                loading: true
            };
        case SEARCH_GET_RESULTS:
            return {
                ...state,
                loading: false,
                results: action.payload
            };
        default:
            return state;
    }
}
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    description: null,
    errors: {}
};

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                description: action.payload.description || initialState.description,
                errors: action.payload.errors || initialState.errors
            };
        case CLEAR_ERRORS:
            return initialState;
        default:
            return state;
    }
};
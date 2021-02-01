
import * as ActionTypes from './ActionTypes';


export const Items = (state = { showHiddenInput: false, isLoading: true, errMess: null, suggestions: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ITEMS:
            return { ...state, isLoading: false, errMess: null, suggestions: action.payload };

        case ActionTypes.ITEMS_LOADING:
            return { ...state, isLoading: true, errMess: null, suggestions: [] };

        case ActionTypes.ITEMS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, suggestions: [] };

        case ActionTypes.TOGGLE_HIDDEN_INPUT:
            return { ...state, showHiddenInput: action.showHiddenInput };

        default:
            return state;
    }
}
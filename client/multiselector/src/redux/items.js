
import * as ActionTypes from './ActionTypes';


export const Items = (state = {isLoading: true, errMess: null, suggestions: []}, action) => {
	switch(action.type) {
		case ActionTypes.ADD_ITEMS:
			return {...state, isLoading: false, errMess: null, suggestions: action.payload};

		case ActionTypes.ITEMS_LOADING:
			return {...state, isLoading: true, errMess: null, suggestions: []};

		case ActionTypes.ITEMS_FAILED:
			return {...state, isLoading: false, errMess: action.payload, suggestions: []};

		default:
			return state;
	}
}
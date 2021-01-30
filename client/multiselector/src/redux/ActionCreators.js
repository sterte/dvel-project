import * as ActionTypes from './ActionTypes';
import { apiUrl } from '../shared/baseUrl';

export const fetchItems = (type, label) => (dispatch) => { //it returns a function -> it is a thunk		
	return fetch(apiUrl + type + "/" + label)
		.then(response => {
			if(response.ok) {
				return response;
			}
			else {
				var error = new Error('Error ' + response.status + ': ' + response.statusText);
				error.response = response;
				throw error;
			}
		},
			error => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)	
		.then(response => response.json())
		.then(items => dispatch(addItems(items)))
		.catch(error => dispatch(itemsFailed(error.message)));
}

export const itemsLoading = () => ({
	type: ActionTypes.ITEMS_LOADING
})

export const itemsFailed = (errmess) => ({
	type: ActionTypes.ITEMS_FAILED,
	payload: errmess
})

export const addItems = (items) => ({
	type: ActionTypes.ADD_ITEMS,
	payload: items
})
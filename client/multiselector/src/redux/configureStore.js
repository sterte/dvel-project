import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Items } from './items';

export const ConfigureStore = () => {
    const store = createStore(Items, applyMiddleware(thunk, logger));
    return store;
}


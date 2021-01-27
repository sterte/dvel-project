import { createStore } from 'redux'

function multiSelectorState(state = {}, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state
    default:
      return state
  }
}

export const ConfigureStore = () => {
  return createStore(multiSelectorState);  
}


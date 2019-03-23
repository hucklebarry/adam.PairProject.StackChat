import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk';

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

// ACTION CREATORS
export const gotMessagesFromServer = (messages) => ({ type: GOT_MESSAGES_FROM_SERVER, messages })

// INITIAL STATE
const initialState = {
  messages: []
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages }
    default:
      return state
  }
}

// STORE
const middlewares = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middlewares)
export default store

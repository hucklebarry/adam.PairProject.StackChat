import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk';
import Axios from 'axios';
import socket from './socket'


// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_CHANNELS_FROM_SERVER = 'GOT_CHANNELS_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

// ACTION CREATORS
export const gotMessagesFromServer = (messages) => ({ type: GOT_MESSAGES_FROM_SERVER, messages })
export const gotChannelsFromServer = (messages, channels) => ({type: GOT_CHANNELS_FROM_SERVER, messages, channels})
export const writeMessage = (message) => ({type: WRITE_MESSAGE, newMessageEntry: message})
export const gotNewMessageFromServer = (message) => ({type: GOT_NEW_MESSAGE_FROM_SERVER, message})

export const fetchMessages = () => {
  return async (dispatch) => {
    const {data} = await Axios.get('/api/messages')
    dispatch(gotMessagesFromServer(data))
  }
}

export const fetchChannels = () => {
  return async (dispatch) => {
    let stuff = await Axios.all([Axios.get('/api/messages'), Axios.get('/api/channels')])
    const data2 = stuff[0].data
    const {data} = stuff[1]
    dispatch(gotChannelsFromServer(data2, data))
  }
}
export const postMessage = (somestring) => {
  return async (dispatch) => {
    const response = await Axios.post('/api/messages', somestring);
    const newMessage = response.data
    const action = gotNewMessageFromServer(newMessage)
    dispatch(action)
    socket.emit('new-message', newMessage)
  }
}
export const getNewMessageFromServer = ()=> {
  return async (dispatch) => {
    const {data} = await Axios.get('/api/messages')
    dispatch(getNewMessageFromServer(data))
  }
}

// INITIAL STATE
const initialState = {
  messages: [],
  channels: [],
  newMessageEntry: ''
}

// REDUCER
export function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages }
    case GOT_CHANNELS_FROM_SERVER:
      let intermediary = {...state, messages: action.messages}
      return {...intermediary, channels: action.channels }
    case WRITE_MESSAGE:
      return {...state, newMessageEntry: action.newMessageEntry}
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {...state, messages: [...state.messages, action.message]}

    default:
      return state
  }
}

// STORE
const middlewares = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middlewares)
export default store

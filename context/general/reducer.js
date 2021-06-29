import { SET_ERROR, SET_LOADING, SET_MESSAGE, SET_TOKEN } from "./types";

export default (state, action) => {
  switch(action.type){
    case SET_TOKEN:
      console.log('payload', action.payload)
      return { ...state, token: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload }
    case SET_MESSAGE:
      return { ...state, message: action.payload}
    case SET_ERROR:
      return { ...state, error: action.payload}
    default:
      return state;
  }
}
import { LOGOUT, SET_ERROR, SET_LOADING, SET_MESSAGE, SET_OWNER, SET_TOKEN, SET_USER } from "./types";

export default (state, action) => {
  switch(action.type){
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload }
    case SET_MESSAGE:
      return { ...state, message: action.payload}
    case SET_ERROR:
      return { ...state, error: action.payload}
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_OWNER:
      return { ...state, me: action.payload }
    case LOGOUT:
      window.localStorage.removeItem('token')
      return { ...state, user: null, token: null, me:null }
    default:
      return state;
  }
}
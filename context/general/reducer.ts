import { IAction, IState } from "../../interfaces";
import { LOGOUT, SET_ERROR, SET_LOADING, SET_MESSAGE, SET_OWNER, SET_TOKEN, SET_USER } from "./types";

const reducer = (state:IState, action: IAction) => {
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
      return { ...state, me: action.payload, loading:false }
    case LOGOUT:
      return { ...state, user: null, message: 'User logged out', me:null }
    default:
      return state;
  }
}

export default reducer;
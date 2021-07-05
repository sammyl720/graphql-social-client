import { createContext } from "react";
import { IState } from "../../interfaces";

const initialState: IState = {
  loading: false,
  error: null,
  message: null,
  me: null,
  user: null,
}


const Context = createContext<IState>({
  ...initialState,
})

export default Context
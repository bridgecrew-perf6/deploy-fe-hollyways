import { createContext, useReducer } from "react";
import { Link } from "react-router-dom";

export const UserContext = createContext();


const initialState = {
  isLogin: false,
  user: {},
};

const Reducer = (state, action) => {
    // const history = useHistory();
    const { type, payload } = action;

    switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    // case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      if(localStorage.getItem('token') === null){
        //   history.push('/login')
        <Link to="/" />
    }
    return {
        isLogin: false,
        user: {},
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
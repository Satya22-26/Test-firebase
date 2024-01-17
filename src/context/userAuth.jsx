
import React, { createContext, useReducer, useContext } from 'react';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

const initialState = {
  isLoggedIn: false,
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = () => {
    dispatch({ type: LOGIN });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: state.isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

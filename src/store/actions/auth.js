import * as actionTypes from './actionTypes';
import FireAuthService from '../../services/firebase';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const register = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
      try{
        const response = await FireAuthService.register(email, password);
        dispatch(authSuccess(response));
      }catch(error){
        console.log(error);
        dispatch(authFail());
      }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    try{
      const response = await FireAuthService.login(email, password);
      console.log(response);
      dispatch(authSuccess(response));
    }catch(error){
      console.log(error);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try{
      await FireAuthService.logout();
    }catch(error){
      console.log(error);
    }
  };
};

  

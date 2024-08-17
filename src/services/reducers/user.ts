import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    TUserActions,
  } from '../actions/user';
  
  interface IUserState {
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  }
  
  const initialState: IUserState = {
    loading: false,
    error: null,
    isAuthenticated: false,
  };
  
  export const userReducer = (state = initialState, action: TUserActions): IUserState => {
    switch (action.type) {
      case REGISTER_USER_REQUEST:
      case LOGIN_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REGISTER_USER_SUCCESS:
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
        };
      case REGISTER_USER_FAILED:
      case LOGIN_USER_FAILED:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };  
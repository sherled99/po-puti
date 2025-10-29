import { registerUser, loginUser, verifyEmail } from '../../utils/api';
import { AppThunk, AppDispatch } from '../types';
import { IAuthResponse, ILogin, IVerifyEmailRequest } from '../types/data';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILED = 'VERIFY_EMAIL_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';

export const AUTH_TOKEN_STORAGE_KEY = 'authToken';
export const AUTH_EMAIL_STORAGE_KEY = 'authEmail';

// Actions for Registration
export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly payload: IAuthResponse;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
  readonly error: string;
}

// Actions for Login
export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload: IAuthResponse;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly error: string;
}

// Actions for verification
export interface IVerifyEmailRequestAction {
  readonly type: typeof VERIFY_EMAIL_REQUEST;
}

export interface IVerifyEmailSuccessAction {
  readonly type: typeof VERIFY_EMAIL_SUCCESS;
  readonly payload: IAuthResponse;
}

export interface IVerifyEmailFailedAction {
  readonly type: typeof VERIFY_EMAIL_FAILED;
  readonly error: string;
}

export interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER;
}

export type TUserActions =
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | IVerifyEmailRequestAction
  | IVerifyEmailSuccessAction
  | IVerifyEmailFailedAction
  | ILogoutUserAction;

export const registerUserRequestAction = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccessAction = (payload: IAuthResponse): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserFailedAction = (error: string): IRegisterUserFailedAction => ({
  type: REGISTER_USER_FAILED,
  error,
});

export const loginUserRequestAction = (): ILoginUserRequestAction => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccessAction = (payload: IAuthResponse): ILoginUserSuccessAction => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserFailedAction = (error: string): ILoginUserFailedAction => ({
  type: LOGIN_USER_FAILED,
  error,
});

export const verifyEmailRequestAction = (): IVerifyEmailRequestAction => ({
  type: VERIFY_EMAIL_REQUEST,
});

export const verifyEmailSuccessAction = (payload: IAuthResponse): IVerifyEmailSuccessAction => ({
  type: VERIFY_EMAIL_SUCCESS,
  payload,
});

export const verifyEmailFailedAction = (error: string): IVerifyEmailFailedAction => ({
  type: VERIFY_EMAIL_FAILED,
  error,
});

export const logoutUserAction = (): ILogoutUserAction => ({
  type: LOGOUT_USER,
});

const persistAuthData = (payload: IAuthResponse) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (payload.token) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, payload.token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  localStorage.setItem(AUTH_EMAIL_STORAGE_KEY, payload.email);
};

const clearAuthData = () => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_EMAIL_STORAGE_KEY);
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export const register: AppThunk = (data: ILogin) => async (dispatch: AppDispatch) => {
  dispatch(registerUserRequestAction());
  try {
    const response = await registerUser(data);
    persistAuthData(response);
    dispatch(registerUserSuccessAction(response));
  } catch (error) {
    clearAuthData();
    dispatch(registerUserFailedAction(getErrorMessage(error, 'Registration failed')));
  }
};

export const login: AppThunk = (data: ILogin) => async (dispatch: AppDispatch) => {
  dispatch(loginUserRequestAction());
  try {
    const response = await loginUser(data);
    persistAuthData(response);
    dispatch(loginUserSuccessAction(response));
  } catch (error) {
    clearAuthData();
    dispatch(loginUserFailedAction(getErrorMessage(error, 'Login failed')));
  }
};

export const verifyEmailCode = (data: IVerifyEmailRequest) => async (dispatch: AppDispatch) => {
  dispatch(verifyEmailRequestAction());
  try {
    const response = await verifyEmail(data);
    persistAuthData(response);
    dispatch(verifyEmailSuccessAction(response));
  } catch (error) {
    dispatch(verifyEmailFailedAction(getErrorMessage(error, 'Verification failed')));
  }
};

export const logout = (): ILogoutUserAction => {
  clearAuthData();
  return logoutUserAction();
};

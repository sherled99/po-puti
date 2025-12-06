import {
  registerUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  getUsers,
  getUserById,
  updateUser,
} from '../../utils/api';
import { AppThunk, AppDispatch } from '../types';
import { IAuthResponse, ILogin, IResetPasswordRequest, IUpdateUserRequest, IVerifyEmailRequest, IUser } from '../types/data';

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
export const AUTH_USER_ID_STORAGE_KEY = 'authUserId';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

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

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly error: string;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly payload: IAuthResponse;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly error: string;
}

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export interface IFetchUserRequestAction {
  readonly type: typeof FETCH_USER_REQUEST;
}

export interface IFetchUserSuccessAction {
  readonly type: typeof FETCH_USER_SUCCESS;
  readonly payload: IUser;
}

export interface IFetchUserFailedAction {
  readonly type: typeof FETCH_USER_FAILED;
  readonly error: string;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: IUser;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly error: string;
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
  | ILogoutUserAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IFetchUserRequestAction
  | IFetchUserSuccessAction
  | IFetchUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction;

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

export const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => ({
  type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailedAction = (error: string): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED,
  error,
});

export const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccessAction = (payload: IAuthResponse): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});

export const resetPasswordFailedAction = (error: string): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED,
  error,
});

export const fetchUserRequestAction = (): IFetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccessAction = (payload: IUser): IFetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserFailedAction = (error: string): IFetchUserFailedAction => ({
  type: FETCH_USER_FAILED,
  error,
});

export const updateUserRequestAction = (): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccessAction = (payload: IUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const updateUserFailedAction = (error: string): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
  error,
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

const persistUserId = (id: string | null | undefined) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (id) {
    localStorage.setItem(AUTH_USER_ID_STORAGE_KEY, id);
  } else {
    localStorage.removeItem(AUTH_USER_ID_STORAGE_KEY);
  }
};

const clearAuthData = () => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_EMAIL_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_ID_STORAGE_KEY);
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export const register = (data: ILogin): AppThunk => async (dispatch: AppDispatch) => {
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

export const login = (data: ILogin): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(loginUserRequestAction());
  try {
    const response = await loginUser(data);
    persistAuthData(response);
    persistUserId(null);
    dispatch(loginUserSuccessAction(response));
  } catch (error) {
    clearAuthData();
    dispatch(loginUserFailedAction(getErrorMessage(error, 'Login failed')));
  }
};

export const verifyEmailCode = (data: IVerifyEmailRequest): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(verifyEmailRequestAction());
  try {
    const response = await verifyEmail(data);
    persistAuthData(response);
    persistUserId(null);
    dispatch(verifyEmailSuccessAction(response));
  } catch (error) {
    dispatch(verifyEmailFailedAction(getErrorMessage(error, 'Verification failed')));
  }
};

export const logout = (): ILogoutUserAction => {
  clearAuthData();
  return logoutUserAction();
};

export const requestPasswordResetEmail =
  (email: string): AppThunk<Promise<void>> =>
  async (dispatch, _getState, _extra) => {
    dispatch(forgotPasswordRequestAction());
    try {
      await requestPasswordReset(email);
      dispatch(forgotPasswordSuccessAction());
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to send reset email');
      dispatch(forgotPasswordFailedAction(message));
      throw new Error(message);
    }
  };

export const submitNewPassword =
  (data: IResetPasswordRequest): AppThunk<Promise<IAuthResponse>> =>
  async (dispatch, _getState, _extra) => {
    dispatch(resetPasswordRequestAction());
    try {
      const response = await resetPassword(data);
      persistAuthData(response);
      persistUserId(null);
      dispatch(resetPasswordSuccessAction(response));
      return response;
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to reset password');
      clearAuthData();
      dispatch(resetPasswordFailedAction(message));
      throw new Error(message);
    }
  };

export const fetchCurrentUser =
  (): AppThunk<Promise<IUser>> =>
  async (dispatch, getState) => {
    const { token, email } = getState().user;
    if (!token) {
      const message = 'Не авторизованы';
      dispatch(fetchUserFailedAction(message));
      throw new Error(message);
    }

    dispatch(fetchUserRequestAction());
    try {
      const users = await getUsers(token);
      const current = email ? users.find((u) => u.email === email) : users[0];
      if (!current) {
        throw new Error('Пользователь не найден');
      }
      persistUserId(current.id);
      dispatch(fetchUserSuccessAction(current));
      return current;
    } catch (error) {
      const message = getErrorMessage(error, 'Не удалось получить профиль');
      dispatch(fetchUserFailedAction(message));
      throw new Error(message);
    }
  };

export const fetchUserById =
  (id: string): AppThunk<Promise<IUser>> =>
  async (dispatch, getState) => {
    const { token } = getState().user;
    if (!token) {
      const message = 'Не авторизованы';
      dispatch(fetchUserFailedAction(message));
      throw new Error(message);
    }

    dispatch(fetchUserRequestAction());
    try {
      const user = await getUserById(id, token);
      persistUserId(user.id);
      dispatch(fetchUserSuccessAction(user));
      return user;
    } catch (error) {
      const message = getErrorMessage(error, 'Не удалось получить профиль');
      dispatch(fetchUserFailedAction(message));
      throw new Error(message);
    }
  };

export const updateCurrentUser =
  (data: IUpdateUserRequest): AppThunk<Promise<IUser>> =>
  async (dispatch, getState) => {
    const { token, userId, profile } = getState().user;
    if (!token) {
      const message = 'Не авторизованы';
      dispatch(updateUserFailedAction(message));
      throw new Error(message);
    }

    const id = userId || profile?.id;
    if (!id) {
      const message = 'Не найден идентификатор пользователя';
      dispatch(updateUserFailedAction(message));
      throw new Error(message);
    }

    dispatch(updateUserRequestAction());
    try {
      const updated = await updateUser(id, data, token);
      persistUserId(updated.id);
      dispatch(updateUserSuccessAction(updated));
      return updated;
    } catch (error) {
      const message = getErrorMessage(error, 'Не удалось обновить профиль');
      dispatch(updateUserFailedAction(message));
      throw new Error(message);
    }
  };

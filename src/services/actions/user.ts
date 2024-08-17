import { registerUser, loginUser } from '../../utils/api';
import { AppThunk, AppDispatch } from '../types';
import { ILogin} from '../types/data';

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

// Actions for Registration
export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
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
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly error: string;
}

export type TUserActions =
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction;

export const registerUserRequestAction = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccessAction = (): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
});

export const registerUserFailedAction = (error: string): IRegisterUserFailedAction => ({
  type: REGISTER_USER_FAILED,
  error,
});

export const loginUserRequestAction = (): ILoginUserRequestAction => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccessAction = (): ILoginUserSuccessAction => ({
  type: LOGIN_USER_SUCCESS,
});

export const loginUserFailedAction = (error: string): ILoginUserFailedAction => ({
  type: LOGIN_USER_FAILED,
  error,
});

export const registerUserThunk: AppThunk = (data: ILogin) => async (dispatch: AppDispatch) => {
  dispatch(registerUserRequestAction());
  try {
    await registerUser(data);
    dispatch(registerUserSuccessAction());
  } catch (error: any) {
    dispatch(registerUserFailedAction(error.message));
  }
};

export const loginUserThunk: AppThunk = (data: ILogin) => async (dispatch: AppDispatch) => {
  dispatch(loginUserRequestAction());
  try {
    await loginUser(data);
    dispatch(loginUserSuccessAction());
  } catch (error: any) {
    dispatch(loginUserFailedAction(error.message));
  }
};
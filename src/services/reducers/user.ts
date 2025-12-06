import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILED,
  LOGOUT_USER,
  TUserActions,
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_EMAIL_STORAGE_KEY,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  AUTH_USER_ID_STORAGE_KEY,
} from '../actions/user';
import { IUser } from '../types/data';

interface IUserState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  emailConfirmed: boolean;
  needsVerification: boolean;
  passwordResetRequested: boolean;
  passwordResetCompleted: boolean;
  profile: IUser | null;
  userId: string | null;
}

const persistedToken = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) : null;
const persistedEmail = typeof window !== 'undefined' ? localStorage.getItem(AUTH_EMAIL_STORAGE_KEY) : null;
const persistedUserId = typeof window !== 'undefined' ? localStorage.getItem(AUTH_USER_ID_STORAGE_KEY) : null;

const initialState: IUserState = {
  loading: false,
  error: null,
  isAuthenticated: Boolean(persistedToken),
  token: persistedToken,
  email: persistedEmail,
  emailConfirmed: Boolean(persistedToken),
  needsVerification: false,
  passwordResetRequested: false,
  passwordResetCompleted: false,
  profile: null,
  userId: persistedUserId,
};

export const userReducer = (state = initialState, action: TUserActions): IUserState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case VERIFY_EMAIL_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case FETCH_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_USER_SUCCESS: {
      const { token, email, emailConfirmed } = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: Boolean(token),
        token,
        email,
        emailConfirmed,
        needsVerification: !emailConfirmed,
        passwordResetRequested: false,
        passwordResetCompleted: false,
        profile: null,
      };
    }
    case LOGIN_USER_SUCCESS: {
      const { token, email, emailConfirmed } = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: Boolean(token),
        token,
        email,
        emailConfirmed: emailConfirmed ?? Boolean(token),
        needsVerification: !emailConfirmed,
        passwordResetRequested: false,
        passwordResetCompleted: false,
        profile: null,
      };
    }
    case VERIFY_EMAIL_SUCCESS: {
      const { token, email, emailConfirmed } = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: Boolean(token),
        token,
        email,
        emailConfirmed: Boolean(emailConfirmed),
        needsVerification: false,
        passwordResetRequested: false,
        passwordResetCompleted: false,
        profile: null,
      };
    }
    case REGISTER_USER_FAILED:
    case LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        isAuthenticated: false,
        token: null,
        email: null,
        emailConfirmed: false,
        needsVerification: false,
        passwordResetRequested: false,
        passwordResetCompleted: false,
        profile: null,
        userId: null,
      };
    case VERIFY_EMAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        isAuthenticated: false,
        token: null,
        emailConfirmed: false,
        needsVerification: true,
        passwordResetRequested: false,
        passwordResetCompleted: false,
        profile: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: false,
        token: null,
        email: null,
        emailConfirmed: false,
        needsVerification: false,
        passwordResetRequested: false,
        passwordResetCompleted: false,
        profile: null,
        userId: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        passwordResetRequested: true,
        passwordResetCompleted: false,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        passwordResetRequested: false,
      };
    case RESET_PASSWORD_SUCCESS: {
      const { token, email, emailConfirmed } = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: Boolean(token),
        token,
        email,
        emailConfirmed: emailConfirmed ?? Boolean(token),
        needsVerification: false,
        passwordResetRequested: false,
        passwordResetCompleted: true,
        profile: null,
      };
    }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        passwordResetCompleted: false,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload,
        userId: action.payload.id,
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload,
        userId: action.payload.id,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

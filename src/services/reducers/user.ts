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
} from '../actions/user';

interface IUserState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  emailConfirmed: boolean;
  needsVerification: boolean;
}

const persistedToken = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) : null;
const persistedEmail = typeof window !== 'undefined' ? localStorage.getItem(AUTH_EMAIL_STORAGE_KEY) : null;

const initialState: IUserState = {
  loading: false,
  error: null,
  isAuthenticated: Boolean(persistedToken),
  token: persistedToken,
  email: persistedEmail,
  emailConfirmed: Boolean(persistedToken),
  needsVerification: false,
};

export const userReducer = (state = initialState, action: TUserActions): IUserState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case VERIFY_EMAIL_REQUEST:
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
      };
    default:
      return state;
  }
};

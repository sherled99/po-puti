import { combineReducers } from 'redux';
import { genderReducer } from './gender';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  gender: genderReducer,
  user: userReducer
});

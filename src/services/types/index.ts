import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { store } from "../store";
import { TGenderActions } from "../actions/gender";
import { TUserActions } from "../actions/user";

type TApplicationActions = 
  | TGenderActions
  | TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions> & Dispatch<TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

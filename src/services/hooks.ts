import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';
  import { AppDispatch, AppThunk, RootState } from './types';
  
  type DispatchFunc = () => AppDispatch

  export const useDispatch = () => dispatchHook<AppDispatch | AppThunk | any>();
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
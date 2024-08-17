import { getGender } from '../../utils/api';
import { AppThunk, AppDispatch } from '../types';
import { IGender } from '../types/data';

export const GET_GENDER_REQUEST = "GET_GENDER_REQUEST";
export const GET_GENDER_SUCCESS = "GET_GENDER_SUCCESS";
export const GET_GENDER_FAILED = "GET_GENDER_FAILED";

export interface IGetGenderRequestAction {
  readonly type: typeof GET_GENDER_REQUEST;
}

export interface IGetGenderSuccessAction {
  readonly type: typeof GET_GENDER_SUCCESS;
  readonly items: Array<IGender>;
}

export interface IGetGenderFailedAction {
  readonly type: typeof GET_GENDER_FAILED;
  readonly error: string;
}

export type TGenderActions =
  | IGetGenderRequestAction
  | IGetGenderSuccessAction
  | IGetGenderFailedAction;

export const getGenderRequestAction = (): IGetGenderRequestAction => ({
  type: GET_GENDER_REQUEST,
});

export const getGenderSuccessAction = (items: Array<IGender>): IGetGenderSuccessAction => ({
  type: GET_GENDER_SUCCESS,
  items,
});

export const getGenderFailedAction = (error: string): IGetGenderFailedAction => ({
  type: GET_GENDER_FAILED,
  error,
});

export const getGenders: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch(getGenderRequestAction());
  getGender()
    .then((res: Array<IGender>) => {
      dispatch(getGenderSuccessAction(res));
    })
    .catch((error: {message: string}) => {
      dispatch(getGenderFailedAction(error.message));
    });
    
};
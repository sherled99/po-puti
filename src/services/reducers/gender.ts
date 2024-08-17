import {
    GET_GENDER_REQUEST,
    GET_GENDER_SUCCESS,
    GET_GENDER_FAILED,
    TGenderActions,
  } from '../actions/gender';
  import { IGender } from '../types/data';
  
  interface IGenderState {
    data: Array<IGender>;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: IGenderState = {
    data: [],
    loading: false,
    error: null,
  };
  
  export const genderReducer = (state = initialState, action: TGenderActions): IGenderState => {
    switch (action.type) {
      case GET_GENDER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case GET_GENDER_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.items,
        };
      case GET_GENDER_FAILED:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
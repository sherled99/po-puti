import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";
import { TModalActions } from "../actions/modal";

interface IModalState {
    isOpen: boolean;
    typeModal: string | null;
}

const initialState: IModalState = {
    isOpen: false,
    typeModal: null
}

export const initialReducer = (state = initialState, action: TModalActions): IModalState => {
    switch (action.type) {
      case OPEN_MODAL: {
        return {
          ...state,
          typeModal: action.typeModal
        };
      }
      case CLOSE_MODAL: {
        return {
          ...state,
          isOpen: false,
          typeModal: null
        };
    }
      default: {
        return state;
      }
    }
  };
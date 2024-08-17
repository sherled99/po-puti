export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

interface OpenModalAction {
    type: typeof OPEN_MODAL;
    typeModal: string;
  }
  
  interface CloseModalAction {
    type: typeof CLOSE_MODAL;
  }

  export type TModalActions =
  | OpenModalAction
  | CloseModalAction;

  export function openModal(typeModal: string): TModalActions {
    return {
      type: OPEN_MODAL,
      typeModal: typeModal,
    };
  }
  
  export function closeModal(): TModalActions {
    return {
      type: CLOSE_MODAL,
    };
  }
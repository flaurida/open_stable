import { RECEIVE_MODAL, CLEAR_MODAL } from '../actions/modal_actions';

const defaultState = null;

const ModalReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_MODAL:
      return action.modal;
    case CLEAR_MODAL:
      return null;
    default:
      return oldState;
  }
};

export default ModalReducer;

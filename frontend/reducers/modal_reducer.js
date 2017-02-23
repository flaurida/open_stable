import { RECEIVE_MODAL, CLEAR_MODAL } from '../actions/modal_actions';

const defaultState = {
  modal: null,
  props: {}
};

const ModalReducer = (oldState = defaultState, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_MODAL:
      return { modal: action.modal, props: action.props };
    case CLEAR_MODAL:
      return defaultState;
    default:
      return oldState;
  }
};

export default ModalReducer;

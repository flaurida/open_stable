export const RECEIVE_MODAL = "RECEIVE_MODAL";
export const CLEAR_MODAL = "CLEAR_MODAL";

export const receiveModal = (modal, props = {}) => ({
  type: RECEIVE_MODAL,
  modal,
  props
});

export const clearModal = () => ({
  type: CLEAR_MODAL
});

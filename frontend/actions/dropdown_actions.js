export const CLEAR_DROPDOWN = "CLEAR_DROPDOWN";
export const RECEIVE_DROPDOWN = "RECEIVE_DROPDOWN";

export const clearDropdown = () => ({
  type: CLEAR_DROPDOWN
});

export const receiveDropdown = dropdown => ({
  type: RECEIVE_DROPDOWN,
  dropdown
});

export const RECEIVE_NOTICES = "RECEIVE_NOTICES";
export const CLEAR_NOTICES = "CLEAR_NOTICES";

export const receiveNotices = notices => ({
  type: RECEIVE_NOTICES,
  notices
});

export const clearNotices = () => ({
  type: CLEAR_NOTICES
});

import * as TableApiUtil from '../util/table_api_util';
import { RECEIVE_ERRORS, CLEAR_ERRORS } from './error_actions';
import { receiveNotices, clearNotices } from './notice_actions';

export const RECEIVE_ALL_TABLES = "RECEIVE_ALL_TABLES";
export const RECEIVE_SINGLE_TABLE = "RECEIVE_SINGLE_TABLE";
export const REMOVE_TABLE = "REMOVE_TABLE";

const createTableMessage = table => (
  `${table.name} is now available for booking at OpenStable!`
);

const updateTableMessage = table => (
  `Operation Edit ${table.name} was a success!`
);

const deleteTableMessage = table => (
  `We will miss you, ${table.name} :(`
);

export const requestAllTables = restaurantId => dispatch => {
  return TableApiUtil.fetchTables(restaurantId).then(tables => {
    dispatch(receiveAllTables(tables));
  });
};

export const requestSingleTable = id => dispatch => {
  return TableApiUtil.fetchTable(id).then(table => {
    dispatch(receiveSingleTable(table));
  });
};

export const createTable = (restaurantId, table) => dispatch => {
  return TableApiUtil.createTable(restaurantId, table).then(newTable => {
    dispatch(receiveSingleTable(newTable));
    dispatch(clearTableErrors());
    dispatch(receiveNotices(createTableMessage(newTable)));
    return newTable;
  }, err => {
    dispatch(receiveTableErrors(err.responseJSON));
  });
};

export const updateTable = (restaurantId, table) => dispatch => {
  return TableApiUtil.updateTable(restaurantId, table).then(updatedTable => {
    dispatch(receiveSingleTable(updatedTable));
    dispatch(clearTableErrors());
    dispatch(receiveNotices(updateTableMessage(updatedTable)));
    return updatedTable;
  }, err => {
    dispatch(receiveTableErrors(err.responseJSON));
  });
};

export const deleteTable = table => dispatch => {
  return TableApiUtil.deleteTable(table.id).then(() => {
    dispatch(removeTable(table));
    dispatch(clearTableErrors());
    dispatch(receiveNotices(deleteTableMessage(table)));
    return table;
  }, err => {
    dispatch(receiveTableErrors(err.responseJSON));
  });
};

const receiveAllTables = tables => ({
  type: RECEIVE_ALL_TABLES,
  tables
});

const receiveSingleTable = table => ({
  type: RECEIVE_SINGLE_TABLE,
  table
});

const removeTable = table => ({
  type: REMOVE_TABLE,
  table
});

export const clearTableErrors = () => ({
  type: CLEAR_ERRORS,
  key: "table"
});

const receiveTableErrors = errors => ({
  type: RECEIVE_ERRORS,
  key: "table",
  errors
});

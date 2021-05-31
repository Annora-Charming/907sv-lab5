import { FILTER_STATE } from './reducers/filterSlice';
import { AppDispatch, REQUEST_STATUS } from './index';
import api from '../api';

export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'delete',
  CHECK: 'check',
  MOVE_UP: 'move_up',
  MOVE_DOWN: 'move_down',
  CHANGE_FILTER_STATE: 'change_filter_state',
  FILTER_SUBSTRING: 'filter_substring',
  SET_ERROR: 'set_error',
  SET_REQUEST_STATUS: 'set_request_status'
} as const;

export interface ActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: string;
}

export interface ActionDelete {
  type: typeof ACTION_TYPES.DELETE;
  payload: string;
}

export interface ActionCheck {
  type: typeof ACTION_TYPES.CHECK;
  payload: string;
}

export interface ActionMoveUp {
  type: typeof ACTION_TYPES.MOVE_UP;
  payload: string;
}

export interface ActionMoveDown {
  type: typeof ACTION_TYPES.MOVE_DOWN;
  payload: string;
}

export interface ActionChangeFilterState {
  type: typeof ACTION_TYPES.CHANGE_FILTER_STATE;
  payload: FILTER_STATE;
}

export interface ActionFilterSubstring {
  type: typeof ACTION_TYPES.FILTER_SUBSTRING;
  payload: string;
}

export interface ActionSetRequestStatus {
  type: typeof ACTION_TYPES.SET_REQUEST_STATUS;
  payload: REQUEST_STATUS;
}

export interface ActionSetError {
  type: typeof ACTION_TYPES.SET_ERROR;
  payload: string;
}

export const setRequestStatus = (requestStatus: REQUEST_STATUS) => ({
  type: ACTION_TYPES.SET_REQUEST_STATUS,
  payload: requestStatus
});

const setError = (error: string) => ({
  type: ACTION_TYPES.SET_ERROR,
  payload: error
});

export const addNewItem = (title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
    const result = await api.todos.add({ title });
    dispatch({ type: ACTION_TYPES.ADD, payload: result });
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
  }
};

export type Action =
  | ActionAdd
  | ActionDelete
  | ActionCheck
  | ActionMoveUp
  | ActionMoveDown
  | ActionChangeFilterState
  | ActionFilterSubstring
  | ActionSetRequestStatus
  | ActionSetError;

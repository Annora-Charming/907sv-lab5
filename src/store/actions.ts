import { FILTER_STATE } from './reducers/filterSlice';
import {REQUEST_STATUS} from "./index";

export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'delete',
  CHECK: 'check',
  MOVE_UP: 'move_up',
  MOVE_DOWN: 'move_down',
  CHANGE_FILTER_STATE: 'change_filter_state',
  FILTER_SUBSTRING: 'filter_substring',
  SET_REQUEST_STATUS: 'set_request_status',
  SET_ERROR: 'set_error',
  SET_RESULT: 'set_result'
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

export const ActionSetRequestStatus = (requestStatus:REQUEST_STATUS) => ({
  type: typeof ACTION_TYPES.SET_REQUEST_STATUS,
  payload: requestStatus
});

export const ActionSaveError = (error:string) => ({
  type: typeof ACTION_TYPES.SET_ERROR,
  payload: error
});

export const ActionSaveResult = (result:[]) => ({
  type: ACTION_TYPES.SET_RESULT,
  payload: result
});



export type Action =
  | ActionAdd
  | ActionDelete
  | ActionCheck
  | ActionMoveUp
  | ActionMoveDown
  | ActionChangeFilterState
  | ActionFilterSubstring;

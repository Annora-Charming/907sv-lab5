import { Item } from '../index';
import { Action, ACTION_TYPES } from '../actions';

export enum REQUEST_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

// these are mutators
function moveUp(list: Item[], id: string): Item[] {
  const indexOfMovingUpItem = list.findIndex(item => item.id === id);
  if (indexOfMovingUpItem === 0) {
    return list;
  } else {
    const copiedList = [...list];
    [copiedList[indexOfMovingUpItem - 1], copiedList[indexOfMovingUpItem]] = [
      copiedList[indexOfMovingUpItem],
      copiedList[indexOfMovingUpItem - 1]
    ];
    return copiedList;
  }
}

function moveDown(list: Item[], id: string): Item[] {
  const indexOfMovingDownItem = list.findIndex(item => item.id === id);
  if (indexOfMovingDownItem === list.length - 1) {
    return list;
  } else {
    const copiedList = [...list];
    [copiedList[indexOfMovingDownItem], copiedList[indexOfMovingDownItem + 1]] = [
      copiedList[indexOfMovingDownItem + 1],
      copiedList[indexOfMovingDownItem]
    ];
    return copiedList;
  }
}

export type TodosSlice = {
  list: Item[];
  requestState: REQUEST_STATUS;
  error: string;
};

export const todosInitialState: TodosSlice = {
  list: [],
  requestState: REQUEST_STATUS.IDLE,
  error: ''
};

export function todosReducer(state = todosInitialState, action: Action): TodosSlice {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case ACTION_TYPES.CHECK: {
      return {
        ...state,
        list: [
          ...state.list.map(function (item) {
            if (item.id === action.payload) {
              return { ...item, isChecked: !item.isChecked };
            }
            return item;
          })
        ]
      };
    }

    case ACTION_TYPES.DELETE: {
      return {
        ...state,
        list: [...state.list.filter(item => item.id !== action.payload)]
      };
    }

    case ACTION_TYPES.MOVE_UP: {
      return {
        ...state,
        list: moveUp(state.list, action.payload)
      };
    }

    case ACTION_TYPES.MOVE_DOWN: {
      return {
        ...state,
        list: moveDown(state.list, action.payload)
      };
    }

    case ACTION_TYPES.SET_REQUEST_STATUS: {
      return {
        ...state,
        requestState: action.payload
      };
    }

    case ACTION_TYPES.SET_ERROR: {
      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
}

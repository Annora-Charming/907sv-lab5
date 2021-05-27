import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducersIndex';
import { todosInitialState, TodosSlice } from './reducers/todosSlice';
import { filterInitialState, FilterSlice } from './reducers/filterSlice';
import thunkMiddleware from 'redux-thunk';

export interface Item {
  id: string;
  isChecked: boolean;
  title: string;
}

export enum REQUEST_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

// export type Store = {
//   todos: TodosSlice;
//   filter: FilterSlice;
// };

export type Store = {
  todos: TodosSlice;
  data: [];
  requestStatus: REQUEST_STATUS;
  error: string;
  filter: FilterSlice;
};

export const initialState: Store = {
  todos: todosInitialState,
  data: [],
  requestStatus: REQUEST_STATUS.IDLE,
  error: '',
  filter: filterInitialState
};

export { rootReducer }; // !!!
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppDispatch = typeof store.dispatch;
export default store;

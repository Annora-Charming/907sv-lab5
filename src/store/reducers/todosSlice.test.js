import { todosReducer } from './todosSlice';
import { ACTION_TYPES } from '../actions';

test('ACTION_TYPES.ADD', () => {
  const newItem = {
    id: '123',
    title: '123',
    isChecked: false
  };
  const state = todosReducer(undefined, { type: ACTION_TYPES.ADD, payload: newItem });
  expect(state.list.length).toBe(1);
  expect(state.list[0].id).toBe(newItem.id);
});

import { initialState } from './index';
import { ACTION_TYPES, addNewItem } from './actions';
import { REQUEST_STATUS } from './reducers/todosSlice';
import fetchMock from 'fetch-mock';
import { mockStore } from '../setupTests';

test('addItemAction', async () => {
  const newItem = {
    id: '123',
    title: '123',
    isChecked: false
  };

  fetchMock.mock(
    'express:/todos', // какой адрес перехватывать
    {
      status: 200, // код ответа
      body: newItem // ответ сервера
    },
    {
      method: 'POST',
      body: { title: '123' } // что ожидается в теле запроса
    }
  );
  const store = mockStore(initialState);
  await store.dispatch(addNewItem('123'));
  expect(store.getActions()).toEqual([
    { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: ACTION_TYPES.ADD, payload: newItem },
    { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: REQUEST_STATUS.SUCCESS }
  ]);
});

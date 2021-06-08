import { screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import { makeTestStore, mockStore, testRender } from '../../setupTests';
import { ACTION_TYPES } from '../../store/actions';
import { REQUEST_STATUS } from '../../store/reducers/todosSlice';
import { initialState } from '../../store';

describe(' Тесты Form > input и addButton', () => {
  test(' Отображение поля для ввода и кнопки для добавления ', () => {
    const store = makeTestStore();
    testRender(<Form />, { store });
    const inputField = screen.getByPlaceholderText('Enter a deed');
    const addButton = screen.getByTestId("I'm addButton");
    expect(inputField).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test(' Вызов addAction с value введенным в поле ввода ', () => {
    const inputValueText = 'Praise the Cat';
    const store = mockStore(initialState);
    testRender(<Form />, { store });
    const inputField = screen.getByPlaceholderText('Enter a deed');
    const addButton = screen.getByTestId("I'm addButton");
    fireEvent.input(inputField, {
      target: { value: inputValueText }
    });
    fireEvent.click(addButton);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.SET_REQUEST_STATUS,
      payload: REQUEST_STATUS.LOADING
    });
  });

  test(' Проверка на пустоту ', () => {
    const store = makeTestStore();
    testRender(<Form />, { store });
    const inputField = screen.getByPlaceholderText('Enter a deed');
    const addButton = screen.getByTestId("I'm addButton");
    fireEvent.input(inputField, {
      target: { value: '' }
    });
    fireEvent.click(addButton);
    expect(store.dispatch).not.toBeCalled();
  });

  test(' Проверка на уникальность ', () => {
    const inputValueText = 'Praise the Cat';
    const store = makeTestStore();
    testRender(<Form />, { store });
    const inputField = screen.getByPlaceholderText('Enter a deed');
    const addButton = screen.getByTestId("I'm addButton");
    fireEvent.input(inputField, {
      target: { value: inputValueText }
    });
    fireEvent.click(addButton);
    fireEvent.input(inputField, {
      target: { value: inputValueText }
    });
    fireEvent.click(addButton);
    expect(store.dispatch).not.toBeCalledTimes(2);
  });
});

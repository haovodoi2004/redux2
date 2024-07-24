import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../reducers/todoReducer';
export default configureStore({
  reducer: {
    listTodoStore: todoReducer,
  },
});

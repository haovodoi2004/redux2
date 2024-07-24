import {createSlice} from '@reduxjs/toolkit';
import {
  addTodoAPI,
  deleteTodoApi,
  updateTodoApi,
  fetchTodos,
} from '../actions/todoAction';
const initialState = {
  listTodo: [], // chứa danh sách công việc
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.listTodo.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteTodoApi.fulfilled, (state, action) => {
        state.listTodo = state.listTodo.filter(
          row => row.id !== action.payload,
        );
      })
      .addCase(deleteTodoApi.rejected, (state, action) => {
        console.log('Delete todo rejected:', action.error.message);
      });
    builder
      .addCase(addTodoAPI.fulfilled, (state, action) => {
        state.listTodo.push(action.payload);
      })
      .addCase(addTodoAPI.rejected, (state, action) => {
        console.log('Add todo rejected:', action.error.message);
      });

    builder
      .addCase(updateTodoApi.fulfilled, (state, action) => {
        const {id, title} = action.payload;
        const todo = state.listTodo.find(row => row.id === id);
        if (todo) {
          todo.title = title; // gán giá trị
        }
      })
      .addCase(updateTodoApi.rejected, (state, action) => {
        console.log('Update todo rejected:', action.error.message);
      });
  },
});

export const {addTodo} = todoSlice.actions;
export default todoSlice.reducer;

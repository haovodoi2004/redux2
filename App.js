import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import TodoScreen from './src/screens/todoScreen';
const App = () => {
  return (
    <Provider store={store}>
      <TodoScreen />
    </Provider>
  );
};
export default App;

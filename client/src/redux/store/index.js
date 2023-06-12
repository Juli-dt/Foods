import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true, // Puedes ajustar esto según tus necesidades
});

export default store;

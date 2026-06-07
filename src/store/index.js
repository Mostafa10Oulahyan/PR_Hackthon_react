import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './librarySlice';

const store = configureStore({
  reducer: {
    library: libraryReducer,
  },
});

export default store;
export const rootReducer = libraryReducer;

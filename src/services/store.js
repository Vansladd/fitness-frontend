import { configureStore } from '@reduxjs/toolkit';
import stepRecordsReducer from './stepRecordsSlice';
import darkModeReducer from './darkModeSlice';

const store = configureStore({
  reducer: {
    stepRecords: stepRecordsReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
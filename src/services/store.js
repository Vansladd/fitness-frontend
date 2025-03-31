import { configureStore } from '@reduxjs/toolkit';
import stepRecordsReducer from './stepRecordsSlice';

const store = configureStore({
  reducer: {
    stepRecords: stepRecordsReducer,
  },
});

export default store;
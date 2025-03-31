import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stepRecords: [],
};

const stepRecordsSlice = createSlice({
  name: 'stepRecords',
  initialState,
  reducers: {
    setStepRecords: (state, action) => {
      state.stepRecords = action.payload;
    },
    addStepRecord: (state, action) => {
      state.stepRecords.push(action.payload);
    },
  },
});

export const { setStepRecords, addStepRecord } = stepRecordsSlice.actions;
export default stepRecordsSlice.reducer;
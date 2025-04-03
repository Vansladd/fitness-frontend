import { createSlice } from "@reduxjs/toolkit";
const initialTheme = localStorage.getItem("theme") === "dark";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    darkMode: initialTheme,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light"); // Save to localStorage
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../services/darkModeSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="hover:cursor-pointer"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
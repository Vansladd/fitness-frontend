import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";
import { getUserid } from "../services/api";
import Cookies from "js-cookie";

const Navbar = () => {
  const token = Cookies.get("access_token");
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <nav
      className={`py-4 shadow-lg transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-600 text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          FitTrack
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-200 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to={`/profile/${getUserid()}`}
                className="hover:text-gray-200 transition-colors"
              >
                Profile
              </Link>
              <Link to="/leaderboard" className="hover:text-gray-200 transition-colors">
                LeaderBoard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-200 transition-colors"
              >
                Register
              </Link>
            </>
          )}
          {/* Dark Mode Toggle */}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

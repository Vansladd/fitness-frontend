import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const token = localStorage.getItem("access_token");

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          FitnessApp
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-200 transition">
                Dashboard
              </Link>
              <Link to="/profile" className="hover:text-gray-200 transition">
                Profile
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-200 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
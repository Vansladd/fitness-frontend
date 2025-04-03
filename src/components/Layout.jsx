import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Layout = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode)
  return (
    <div className={`flex flex-col min-h-screen transition-colors ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
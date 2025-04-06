import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Home = () => {
  useEffect(() => {
    document.title = "FitTrack";
  },[])
  const darkMode = useSelector((state) => state.darkMode.darkMode);
    return (
      <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? "text-white" : "text-gray"}`}>
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to FitTrack</h1>
          <p className="text-lg text-gray-600 mb-6">
            Track your steps, monitor your progress, and achieve your fitness goals!
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 transition"
            >
              Login
            </Link>
          </div>
        </header>
        <section className="mt-10 px-6">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅ Step tracking with Apple Watch integration</li>
            <li>✅ Personalized calorie estimation</li>
            <li>✅ Secure JWT-based authentication</li>
            <li>✅ User dashboard with progress tracking</li>
          </ul>
        </section>
      </div>
    );
  };
export default Home;
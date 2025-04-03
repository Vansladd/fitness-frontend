import CaloriesChart from "./CaloriesChart";
import Stepsrecords from "./Stepsrecords";
import { useSelector } from 'react-redux';


const MainContent = () => {
    const stepRecords = useSelector((state) => state.stepRecords.stepRecords);
    const darkMode = useSelector((state) => state.darkMode.darkMode)
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Steps Tracker */}
        <div  className={`p-4 rounded-xl transition-all 
            ${darkMode ? "bg-gray-800 text-gray-300 shadow-lg shadow-gray-900 border border-gray-700" 
                       : "bg-white text-gray-800 shadow-lg shadow-gray-300 border border-gray-200"}`}>
          <h2 className="text-xl font-semibold">Steps Tracker</h2>
          <Stepsrecords/>
        </div>
  
        {/* Calorie Estimator */}
        <div  className={`p-4 rounded-xl transition-all 
            ${darkMode ? "bg-gray-800 text-gray-300 shadow-lg shadow-gray-900 border border-gray-700" 
                       : "bg-white text-gray-800 shadow-lg shadow-gray-300 border border-gray-200"}`}>
          <h2 className="text-xl font-semibold">Calorie Estimator</h2>
          <CaloriesChart stepRecords={stepRecords}/>
        </div>
  
        {/* Workout Log */}
        <div  className={`p-4 rounded-xl transition-all 
            ${darkMode ? "bg-gray-800 text-gray-300 shadow-lg shadow-gray-900 border border-gray-700" 
                       : "bg-white text-gray-800 shadow-lg shadow-gray-300 border border-gray-200"}`}>
          <h2 className="text-xl font-semibold">Workout Log</h2>
          <p>Log your daily workouts here.</p>
        </div>
      </div>
    );
  };
  
  export default MainContent;
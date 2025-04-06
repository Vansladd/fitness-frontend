import CaloriesChart from "./CaloriesChart";
import Stepsrecords from "./Stepsrecords";
import { useSelector } from 'react-redux';
import WorkoutLog from "./WorkoutLog";

const MainContent = () => {
  const stepRecords = useSelector((state) => state.stepRecords.stepRecords);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const cardStyles = `rounded-2xl p-6 transition-all border shadow-md flex flex-col 
    ${darkMode 
      ? "bg-gray-900 text-gray-200 border-gray-700 shadow-black/30" 
      : "bg-white text-gray-800 border-gray-200 shadow-gray-300"
    }`;

  const headingStyles = "text-2xl font-bold mb-4";

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Steps + Calories (2/3 width) */}
      <div className="lg:col-span-2 flex flex-col gap-8">
        {/* Steps Tracker */}
        <div className={cardStyles}>
          <h2 className={headingStyles}>🚶‍♂️ Steps Tracker</h2>
          <div className="flex-grow min-h-[300px]">
            <Stepsrecords />
          </div>
        </div>

        {/* Calorie Estimator */}
        <div className={cardStyles}>
          <h2 className={headingStyles}>🔥 Calorie Estimator</h2>
          <div className="flex-grow min-h-[300px]">
            <CaloriesChart stepRecords={stepRecords} />
          </div>
        </div>
      </div>

      {/* Right Column: Workout Log (1/3 width) */}
      <div className={cardStyles}>
        <h2 className={headingStyles}>🏋️ Workout Log</h2>
        <div className="flex-grow min-h-[630px]"> {/* Matches combined height of above */}
          <WorkoutLog />
        </div>
      </div>
    </div>
  );
};

export default MainContent;

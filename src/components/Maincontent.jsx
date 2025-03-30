import Stepsrecords from "./Stepsrecords";


const MainContent = () => {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Steps Tracker */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Steps Tracker</h2>
          <Stepsrecords/>
        </div>
  
        {/* Calorie Estimator */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Calorie Estimator</h2>
          <p>See how many calories you've burned.</p>
        </div>
  
        {/* Workout Log */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Workout Log</h2>
          <p>Log your daily workouts here.</p>
        </div>
      </div>
    );
  };
  
  export default MainContent;
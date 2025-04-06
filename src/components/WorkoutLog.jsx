import { useState, useEffect } from "react";
import { fetchWorkouts, logWorkout } from "../services/api";

const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    workout_type: "running",
    duration_minutes: "",
    calories_burned: "",
    notes: ""
  });

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    const data = await fetchWorkouts();
    setWorkouts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logWorkout(formData);
    setFormData({
      workout_type: "running",
      duration_minutes: "",
      calories_burned: "",
      notes: ""
    });
    loadWorkouts(); // Refresh the list
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Log a Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select
          name="workout_type"
          value={formData.workout_type}
          onChange={(e) => setFormData({ ...formData, workout_type: e.target.value })}
          className="w-full p-2 border"
        >
          <option value="running">Running</option>
          <option value="weightlifting">Weightlifting</option>
          <option value="cycling">Cycling</option>
          <option value="yoga">Yoga</option>
          <option value="swimming">Swimming</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={formData.duration_minutes}
          onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
          className="w-full p-2 border"
        />
        <input
          type="number"
          placeholder="Calories burned"
          value={formData.calories_burned}
          onChange={(e) => setFormData({ ...formData, calories_burned: e.target.value })}
          className="w-full p-2 border"
        />
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Save Workout
        </button>
      </form>

      <h3 className="text-lg font-bold mt-6 mb-2">Workout History</h3>
      <ul className="space-y-2">
        {workouts.map((w) => (
          <li key={w.id} className="border p-2">
            <strong>{w.workout_type}</strong> - {w.duration_minutes} min, {w.calories_burned} cal
            <br />
            <small>{w.date}</small><br />
            {w.notes && <em>Notes: {w.notes}</em>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutLog;

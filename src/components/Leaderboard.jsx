import { use, useEffect, useState } from "react"
import { getLeaderBoard } from "../services/api";
import Loader from "./Loader";
import { useSelector } from "react-redux";



const Leaderboard = () => {
    const [leaderboard, setleaderboard] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const darkMode = useSelector((state) => state.darkMode.darkMode);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try{
                let data = await getLeaderBoard();
                setleaderboard(...data);
                setLoading(false)
            } catch(error){
                setError(error)
            }
        }
        fetchLeaderboard();

    },[])

    if(error){
        return <div>Could Not Retrieve LeaderBoard</div>
    }
    if(Loading){
        return <Loader/>
    }
    return (
        <div className={`overflow-x-auto p-4 h-screen ${darkMode ? "text-white" : "text-black"}`}>
      <table className="min-w-full h-full shadow-md rounded-lg overflow-hidden">
        <thead className={`${darkMode ? "bg-blue-900 text-white" : "bg-blue-600 text-white"}`}>
          <tr>
            <th className="py-3 px-6 text-left">Rank</th>
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-left">Total Steps</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
            leaderboard.map((row, index) => (
              <tr
                key={index}
                className={`border-b transition ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{row.user__username || "Unknown User"}</td>
                <td className="py-3 px-6">{row.total_steps || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center">
                No leaderboard data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default Leaderboard;
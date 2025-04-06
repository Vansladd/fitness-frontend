import { useEffect } from "react";
import MainContent from "./MainContent";

const Dashboard = () => {
  useEffect(() => {
      document.title = "DashBoard";
    },[])
  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainContent />
    </div>
  );
};

export default Dashboard;
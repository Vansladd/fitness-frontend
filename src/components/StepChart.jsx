import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StepChart = ({ stepRecords }) => {
  const data = {
    labels: stepRecords.map(record => record.date), 
    datasets: [
      {
        label: "Steps Taken",
        data: stepRecords.map(record => record.steps),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default StepChart;
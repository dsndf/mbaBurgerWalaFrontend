import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Dash.scss";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import Loading from "./Loading";
ChartJS.register(ArcElement, Tooltip, Legend);
const Box = ({ title, count }) => (
  <div className="dash-box">
    <h2>{title}</h2>
    <h3>{title === "Income" ? `₹${count}` : count}</h3>
  </div>
);
const server = 'https://mbabwbackend.onrender.com';
const Dashboard = () => {
  const [state, setState] = useState({});
  const [status, setStatus] = useState(false);
  const getCounts = async () => {
    const { data } = await axios.get(`${server}/admin/stats`);
    setState(data);
    setStatus(true);
  };
  const data = {
    labels: ["Processing", "Shipped", "Deliverd"],
    datasets: [
      {
        label: "# of orders",
        data: [
          state.processingOrders,
          state.shippedOrders,
          state.deliveredOrders,
        ],
        backgroundColor: [
          "rgb(159,63,176,0.1)",
          "rgb(78,63,176,0.2)",
          "rgb(156,0,60,0.3)",
        ],
        borderColor: ["rgb(159,63,176)", "rgb(78,63,176)", "rgb(156,0,60)"],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    getCounts();
  }, []);
  if(!status){
    return <Loading/>
  }
  return (
    <div className="dashboard">
      <div>
        <div className="dash-fields">
          <Box title={"Users"} count={state.userCounts} />
          <Box title={"Orders"} count={state.ordersCounts} />
          <Box title={"Income"} count={state.totalIncome} />
        </div>

        <div>
          <div>
            <Link className="btn" to="/admin/orders">
              View Orders
            </Link>

            <Link className="btn" to="/admin/users">
              View Users
            </Link>
          </div>
          <div className="chart">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

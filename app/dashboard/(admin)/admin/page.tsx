"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const kpis = [
    { title: "Total Users", value: 4521 },
    { title: "Total Vendors", value: 231 },
    { title: "Total Products", value: 1584 },
    { title: "Total Revenue", value: "$91,320" },
    { title: "Flagged Products", value: 7 },
    { title: "Reports", value: 15 },
  ];

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 8200, 7200, 9800, 11200, 9100],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [400, 550, 680, 760, 900, 1020],
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ["Electronics", "Fashion", "Home", "Books", "Other"],
    datasets: [
      {
        label: "Categories",
        data: [35, 25, 15, 10, 15],
        backgroundColor: [
          "#3b82f6",
          "#f59e0b",
          "#10b981",
          "#8b5cf6",
          "#ef4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="p-4 md:p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        Admin Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className=" rounded-xl shadow p-4 text-center bg-gray-800"
          >
            <p className="text-sm text-white">{kpi.title}</p>
            <p className="text-2xl font-semibold text-gray-300">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            Revenue Over Time
          </h2>
          <Line data={revenueData} />
        </div>
        <div className="bg-gray-800 rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            User Growth Over Time
          </h2>
          <Line data={userGrowthData} />
        </div>
        <div className="bg-gray-800 rounded-xl shadow p-4 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">
            Product Categories Distribution
          </h2>
          <div className="w-full md:w-1/2 mx-auto">
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Manage Users
        </button>
        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
          Approve Vendors
        </button>
      </div>
    </section>
  );
};

export default AdminDashboard;

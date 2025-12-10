import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const COLORS = ["#5b46b1", "#f97316"]; // Pie chart colors

const ChartHr = () => {
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Pie Chart Data
    axiosSecure
      .get("/api/dashboard/pie")
      .then((res) => {
        const formatted = res.data.map((item) => {
          const type = item._id?.toLowerCase();
          return {
            name: type === "returnable" ? "Returnable" : "Non-Returnable",
            value: item.count,
          };
        });
        setPieData(formatted);
      })
      .catch((err) => console.log(err));

    // Bar Chart Data
    axiosSecure
      .get("/api/dashboard/bar")
      .then((res) => {
        const formatted = res.data.map((item) => ({
          name: item._id,
          requests: item.count,
        }));
        setBarData(formatted);
      })
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 lg:px-20">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        HR Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Assets: Returnable vs Non-Returnable
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ReTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Top 5 Requested Assets
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Bar dataKey="requests" fill="#5b46b1" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartHr;

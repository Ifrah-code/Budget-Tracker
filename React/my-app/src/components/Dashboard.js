import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
const PIE_COLORS = ["#FF6384", "#36A2EB"];
const BAR_COLORS = { INCOME: "#FF6384", EXPENSE: "#36A2EB" };
const Dashboard = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amount, 0);
  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];
  const barData = [
    { name: "Income", Income: totalIncome, Expense: 0 },
    { name: "Expense", Income: 0, Expense: totalExpense },
  ];

  return (
    <div
      className="dashboard-container"
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#ffffff",
      }}
    >
    
      <div style={{ flex: 1, height: 300, backgroundColor: "#f9f9f9", borderRadius: "10px", padding: "10px" }}>
        <h3 style={{ textAlign: "center", color: "#333" }}>Income vs Expense</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    
      <div style={{ flex: 1, height: 300, backgroundColor: "#f9f9f9", borderRadius: "10px", padding: "10px" }}>
        <h3 style={{ textAlign: "center", color: "#333" }}>Income & Expense Bar Chart</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" name="Income" fill={BAR_COLORS.INCOME} />
            <Bar dataKey="Expense" name="Expense" fill={BAR_COLORS.EXPENSE} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

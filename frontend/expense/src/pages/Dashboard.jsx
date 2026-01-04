import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../App";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const COLORS = ["#38bdf8", "#22c55e", "#f97316", "#a855f7", "#ef4444"];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  // fetch all expenses
  useEffect(() => {
    axios
      .get(`${serverURL}/api/expense/getexpense`, { withCredentials: true })
      .then((res) => setExpenses(res.data))
      .catch(console.log);
  }, []);

  // helper: string amount → number (safe for "2,000" or " 2000 ")
  const amt = (a) => Number(a?.toString().replace(/,/g, "").trim()) || 0;

  /* ================= TODAY ================= */
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const todayExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d >= startOfDay && d < endOfDay;
  });
  const todayTotal = todayExpenses.reduce((s, e) => s + amt(e.amount), 0);

  /* ================= WEEKLY ================= */
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - 6); // last 7 days
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 1);

  const weeklyExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d >= startOfWeek && d < endOfWeek;
  });
  const weeklyTotal = weeklyExpenses.reduce((s, e) => s + amt(e.amount), 0);
  const weeklyAvg = weeklyTotal / 7;

  // prepare weekly chart data
  const weeklyMap = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    weeklyMap[d.toDateString()] = 0;
  }
  weeklyExpenses.forEach((e) => {
    const d = new Date(e.date).toDateString();
    if (weeklyMap[d] !== undefined) {
      weeklyMap[d] += amt(e.amount);
    }
  });
  const weekData = Object.keys(weeklyMap).map((d) => ({
    day: d.split(" ")[0], // Mon, Tue
    amount: weeklyMap[d],
  }));

  /* ================= MONTHLY ================= */
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthlyMap = {};
  for (let i = 1; i <= daysInMonth; i++) monthlyMap[i] = 0;

  expenses.forEach((e) => {
    const d = new Date(e.date);
    if (d.getMonth() === month && d.getFullYear() === year) {
      monthlyMap[d.getDate()] += amt(e.amount);
    }
  });

  const monthData = Object.keys(monthlyMap).map((d) => ({
    day: d,
    amount: monthlyMap[d],
  }));

  const monthlyTotal = monthData.reduce((s, d) => s + d.amount, 0);
  const monthlyAvg = monthlyTotal / daysInMonth;

  /* ================= PIE (CATEGORY) ================= */
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.item] = (categoryMap[e.item] || 0) + amt(e.amount);
  });

  const pieData = Object.keys(categoryMap).map((k) => ({
    name: k,
    value: categoryMap[k],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6 space-y-10">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow hover:bg-sky-100"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-sky-800">
          Expense Dashboard
        </h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">
        <Stat title="Today Total" value={todayTotal} />
        <Stat title="Weekly Total" value={weeklyTotal} />
        <Stat title="Monthly Total" value={monthlyTotal} />
      </div>

      {/* TODAY */}
      <Card title="Today Expense">
        <BarChart width={400} height={250} data={[{ name: "Today", amount: todayTotal }]}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#38bdf8" />
        </BarChart>
        <p className="text-sm text-gray-500 mt-2">
          Total: ₹{todayTotal}
        </p>
      </Card>

      {/* WEEKLY */}
      <Card title="Weekly Trend">
        <LineChart width={600} height={250} data={weekData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
        <p className="text-sm text-gray-500 mt-2">
          Total: ₹{weeklyTotal} | Avg per day: ₹{weeklyAvg.toFixed(0)}
        </p>
      </Card>

      {/* MONTHLY */}
      <Card title="Monthly Expenses">
        <BarChart width={700} height={300} data={monthData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#a855f7" />
        </BarChart>
        <p className="text-sm text-gray-500 mt-2">
          Total: ₹{monthlyTotal} | Avg per day: ₹{monthlyAvg.toFixed(0)}
        </p>
      </Card>

      {/* PIE */}
      <Card title="Category Wise Expense">
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Card>
    </div>
  );
};

/* ===== SMALL COMPONENTS ===== */

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <h2 className="font-semibold text-lg text-sky-700 mb-4">{title}</h2>
    {children}
  </div>
);

const Stat = ({ title, value }) => (
  <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-5 rounded-2xl shadow">
    <p className="text-sm opacity-80">{title}</p>
    <p className="text-2xl font-bold">₹ {value}</p>
  </div>
);

export default Dashboard;

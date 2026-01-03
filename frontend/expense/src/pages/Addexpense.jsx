import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../App";
import { ArrowLeft } from "lucide-react";
import Allexpense from "../components/Allexpense";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setExpenseData } from "../redux/userdata/expenseSlice";

const Addexpense = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/expense/getexpense`, {
        withCredentials: true,
      });
      setExpenses(res.data || []);
      // dispatch(setExpenseData(res.data));
    } catch (error) {
      console.log("Fetch expenses error:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        amount: e.target.amount.value,
        item: e.target.item.value,
        note: e.target.note.value,
        date: e.target.date.value,
      };

      const res = await axios.post(`${serverURL}/api/expense/addexpense`, obj, {
        withCredentials: true,
      });

      // REALTIME UPDATE
      setExpenses((prev) => [res.data.data, ...prev]);
      // dispatch(setExpenseData([res.data.data, ...expenses]));

      e.target.reset();
    } catch (error) {
      console.log("Add expense error:", error);
    }
  };

  return (
    <div className="sm:flex w-screen h-screen">
      {/* LEFT - ADD FORM */}
      <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4 sm:w-1/2">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <ArrowLeft
              className="text-sky-600 cursor-pointer"
              onClick={() => navigate("/mainscreen")}
            />
            <h2 className="text-xl font-bold text-sky-800">Add Expense</h2>
          </div>

          {/* Custom SVG Illustration */}
          <div className="flex justify-center mb-6">
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="70" cy="70" r="70" fill="#E0F2FE" />
              <rect x="35" y="40" width="70" height="50" rx="10" fill="#38BDF8" />
              <rect x="45" y="50" width="50" height="8" rx="4" fill="white" />
              <rect x="45" y="65" width="35" height="8" rx="4" fill="white" />
              <circle cx="95" cy="85" r="14" fill="#0EA5E9" />
              <text
                x="95"
                y="90"
                textAnchor="middle"
                fontSize="18"
                fill="white"
                fontWeight="bold"
              >
                ₹
              </text>
            </svg>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="amount"
              placeholder="Enter amount ₹"
              required
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <input
              type="text"
              name="item"
              placeholder="Expense name"
              required
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <input
              type="date"
              name="date"
              required
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <textarea
              name="note"
              rows="3"
              placeholder="Add a note (optional)"
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT - REALTIME LIST */}
      <div className="sm:w-1/2 h-screen">
        <Allexpense expense={expenses} />
      </div>
    </div>
  );
};

export default Addexpense;

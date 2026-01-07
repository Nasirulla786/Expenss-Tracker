import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, IndianRupee, Wallet, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { setUserData } from "../redux/userdata/userslice";

// Dummy logo (SVG style UI element)
const DummyLogo = () => (
  <div className="h-12 w-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl shadow">
   DB
  </div>
);

const Mainscreen = () => {
  const userdata = useSelector((state) => state.user);
  const name = userdata?.userData?.name || "User";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        `${serverURL}/api/expense/getexpense`,
        { withCredentials: true }
      );
      setExpenses(res.data || []);
    } catch (error) {
      console.log("fetch expense error", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalAmount = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-sky-50 p-4 sm:p-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-sky-900">
            Welcome, {name} 👋
          </h1>
          <p className="text-sky-600 text-sm sm:text-base">
            Track and manage your expenses
          </p>
        </div>
   <div className="flex items-center justify-center gap-5">
    <h1 className="text-white bg-red-500 p-2 rounded w-20 text-center cursor-pointer" onClick={async()=>{
      const res = await axios.get(`${serverURL}/api/user/logout` ,{withCredentials:true});
      if(res){
        dispatch(setUserData(null));
        alert("Logout sucessfully..!");

        navigate("/login");
      }

    }}>Logo</h1>
       <div  onClick={()=>{
          navigate("/dashboard")
        }} >
          <DummyLogo/>
      </div>
   </div>
      </div>

      {/* ===== Total Expense Card ===== */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-8 text-center">
        <p className="text-sky-500 mb-2 text-sm">Total Expense</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-sky-700 flex items-center justify-center gap-1">
          <IndianRupee size={28} />
          {totalAmount}
        </h2>
      </div>

      {/* ===== Quick Stats ===== */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow">
          <div className="flex items-center gap-2 text-sky-600 mb-1">
            <Wallet size={18} />
            <span className="text-sm">Entries</span>
          </div>
          <p className="text-2xl font-bold text-sky-800">
            {expenses.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-sky-600">Manage Expense</p>
            <p className="text-xs text-gray-400">Quick entry</p>
          </div>
          <button
            onClick={() => navigate("/addexpense")}
            className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white shadow hover:bg-sky-600 transition"
          >
            <Plus />
          </button>
        </div>
      </div>

      {/* ===== Recent Expenses (Top 3) ===== */}
      <div className="bg-white rounded-3xl shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-sky-800">
            Recent Expenses
          </h2>

          {/* More / Add button */}
          <button
            onClick={() => navigate("/addexpense")}
            className="text-sky-600 hover:text-sky-800 text-sm font-medium"
          >
            More Expenses →
          </button>
        </div>

        {expenses.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            No expenses added yet
          </p>
        )}

        {expenses.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-3 border-b last:border-none"
          >
            <div>
              <p className="font-medium text-sky-800">
                {item.item}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.date).toDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <p className="font-semibold text-sky-700 flex items-center gap-1">
                <IndianRupee size={14} />
                {item.amount}
              </p>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mainscreen;

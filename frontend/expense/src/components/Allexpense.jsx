import React from "react";
import { CalendarDays, IndianRupee, Trash2 } from "lucide-react";

const Allexpense = ({ expense }) => {
  return (
    <div className="min-h-screen bg-sky-50 p-5 flex flex-col">
      {/* Header */}
      <div className="mb-5 flex-shrink-0">
        <h1 className="text-2xl font-bold text-sky-800">All Expenses</h1>
        <p className="text-sm text-sky-500">Your spending at a glance</p>
      </div>

      {/* Scrollable Expense List */}
      <div className="flex-1 overflow-y-auto">
        {/* Empty State */}
        {expense.length === 0 && (
          <div className="mt-20 text-center text-gray-400">
            <p className="text-lg">No expenses yet 💸</p>
            <p className="text-sm">Add your first expense</p>
          </div>
        )}

        {/* Expense Cards */}
        <div className="space-y-4">
          {expense.map((e, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
            >
              {/* Left Content */}
              <div className="space-y-1">
                <h2 className="font-semibold text-sky-800 text-lg">{e.item}</h2>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CalendarDays size={14} />
                  <span>{new Date(e.date).toDateString()}</span>
                </div>

                {e.note && <p className="text-xs text-gray-500">{e.note}</p>}
              </div>

              {/* Right Content */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 font-bold text-sky-700">
                  <IndianRupee size={16} />
                  {e.amount}
                </div>

                {/* UI-ONLY Delete Icon */}
                <div className="text-gray-300 cursor-not-allowed">
                  <Trash2 size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allexpense;

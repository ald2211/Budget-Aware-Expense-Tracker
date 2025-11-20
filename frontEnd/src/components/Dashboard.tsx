import { Plus } from "lucide-react";
import { useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { useDashboardData } from "../hooks/useExpenses";
import type { DashBoardItem } from "../types";
import { useToast } from "../hooks/useToast";
import CustomToast from "../helpers/CustomToast";

const formatMonth = (monthStr: string) => {
  const date = new Date(monthStr + "-01");
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const formatCurrency = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export const Dashboard = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 7);
  });
  const { toast } = useToast();
  const { data } = useDashboardData(selectedMonth);
  const dashboardData: DashBoardItem[] = data?.dashboardData ?? [];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <CustomToast message={toast.message} type={toast.type} />
        </div>
      )}
      {/* Month header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {formatMonth(selectedMonth)}
        </h1>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(dashboardData ?? []).map((item) => {
          const { category, spent, limit, remaining, status } = item;

          const percentage = limit ? (spent / limit) * 100 : 0;
          const isOverBudget = status === "over_budget";

          return (
            <div
              key={category._id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              {/* Category title */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-semibold text-gray-800">
                    {category.name}
                  </h3>
                </div>

                {status === "no_budget" && (
                  <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full font-medium">
                    NO BUDGET
                  </span>
                )}

                {status === "within_budget" && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">
                    WITHIN BUDGET
                  </span>
                )}

                {status === "over_budget" && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-medium">
                    OVER BUDGET
                  </span>
                )}
              </div>

              {/* Budget info */}
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>
                    {formatCurrency(spent)} / {formatCurrency(limit ?? 0)}
                  </span>

                  <span
                    className={
                      (remaining ?? 0) < 0
                        ? "text-red-600 font-semibold"
                        : "text-gray-600"
                    }
                  >
                    {formatCurrency(Math.abs(remaining ?? 0))}{" "}
                    {(remaining ?? 0) < 0 ? "over" : "left"}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: isOverBudget
                        ? "#ef4444"
                        : category.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add expense */}
      <button
        onClick={() => setShowExpenseForm(true)}
        className="fixed bottom-20 right-6 md:bottom-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors"
      >
        <Plus size={24} />
      </button>

      {showExpenseForm && (
        <ExpenseForm setShowExpenseForm={setShowExpenseForm} />
      )}
    </div>
  );
};

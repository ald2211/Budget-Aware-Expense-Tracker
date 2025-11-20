import { useState } from "react";
import { useDashboardData } from "../hooks/useExpenses";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DashBoardItem } from "../types";

const formatCurrency = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
export const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const { data } = useDashboardData(selectedMonth);
  const dashboardData: DashBoardItem[] = data?.dashboardData ?? [];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-8">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Spent
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Budget
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Remaining
              </th>
            </tr>
          </thead>

          <tbody>
            {dashboardData.map((item) => (
              <tr
                key={item.category._id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* Category */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.category.color }}
                    />
                    <span className="font-medium text-gray-800">
                      {item.category.name}
                    </span>
                  </div>
                </td>

                {/* Spent */}
                <td className="px-4 py-3 text-right text-gray-700">
                  {formatCurrency(item.spent)}
                </td>

                {/* Budget */}
                <td className="px-4 py-3 text-right text-gray-700">
                  {item.limit !== null ? formatCurrency(item.limit) : "-"}
                </td>

                {/* Remaining */}
                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    item.status === "over_budget"
                      ? "text-red-600"
                      : item.status === "no_budget"
                      ? "text-gray-500"
                      : "text-green-600"
                  }`}
                >
                  {item.status === "no_budget"
                    ? "No budget"
                    : formatCurrency(item.remaining ?? 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- BAR CHART ---------- */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Spent vs Budget</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData}>
            <XAxis dataKey="category.name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />

            <Bar dataKey="spent" name="Spent" fill="#3b82f6" />
            <Bar dataKey="limit" name="Budget" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

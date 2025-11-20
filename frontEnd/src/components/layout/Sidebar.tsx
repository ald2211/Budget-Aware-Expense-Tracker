import { NavLink } from "react-router-dom";
import { Home, TrendingUp, Settings, Plus, LogOut } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

export const Sidebar = () => {
  const { openExpenseModal } = useModal();
  const {logout} = useAuth()

  return (
    <nav className="hidden md:flex flex-col justify-between fixed left-0 top-0 bottom-0 w-64 mt-5 bg-white border-r border-gray-200 p-4">
      
      {/* TOP SECTION */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">
          Budget Tracker
        </h2>

        <div className="space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>

          <button
            onClick={openExpenseModal}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Plus size={20} />
            <span>Add Expense</span>
          </button>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <TrendingUp size={20} />
            <span>Reports</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-6 border-t pt-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

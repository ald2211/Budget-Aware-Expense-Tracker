import { NavLink } from "react-router-dom";
import { Home, TrendingUp, Settings, Plus } from "lucide-react";
import { useModal } from "../../hooks/useModal";

export const MobileNav = () => {
  const { openExpenseModal } = useModal();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-3 ${
              isActive ? "text-blue-600" : "text-gray-600"
            }`
          }
        >
          <Home size={24} />
          <span className="text-xs mt-1">Dashboard</span>
        </NavLink>

        <button
          onClick={openExpenseModal}
          className="flex-1 flex flex-col items-center py-3 text-gray-600"
        >
          <Plus size={24} />
          <span className="text-xs mt-1">Add</span>
        </button>

        <NavLink
          to="/report"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-3 ${
              isActive ? "text-blue-600" : "text-gray-600"
            }`
          }
        >
          <TrendingUp size={24} />
          <span className="text-xs mt-1">Reports</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-3 ${
              isActive ? "text-blue-600" : "text-gray-600"
            }`
          }
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};

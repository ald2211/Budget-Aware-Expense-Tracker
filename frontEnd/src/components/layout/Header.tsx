import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="
       fixed top-0 left-0 right-0 
       bg-white border-b border-gray-200 
       h-16 px-4 md:px-6 
       flex items-center justify-between 
       z-40
    ">
      <h1 className="text-lg md:text-xl font-semibold text-gray-800">
        Budget Tracker
      </h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
      >
        <LogOut size={20} />
        <span className="hidden sm:inline font-medium">Logout</span>
      </button>
    </header>
  );
};

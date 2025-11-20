import { useModal } from "../../hooks/useModal";
import { ExpenseForm } from "../ExpenseForm";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { showExpenseModal, closeExpenseModal } = useModal();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Header (always visible) */}
      <Header />

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Bottom Nav */}
      <MobileNav />

      {/* Page Content */}
      <main className="pt-20 md:pt-20 md:ml-64 p-4 md:p-6">{children}</main>

      {/* Expense Modal */}
      {showExpenseModal && (
        <ExpenseForm setShowExpenseForm={closeExpenseModal} />
      )}
    </div>
  );
};

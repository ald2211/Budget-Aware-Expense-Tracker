import { useState } from "react";
import { ModalContext } from "./ModalContext";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showExpenseModal,
        openExpenseModal: () => setShowExpenseModal(true),
        closeExpenseModal: () => setShowExpenseModal(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};


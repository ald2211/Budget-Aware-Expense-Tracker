import { createContext } from "react";

type ModalContextType = {
  showExpenseModal: boolean;
  openExpenseModal: () => void;
  closeExpenseModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);



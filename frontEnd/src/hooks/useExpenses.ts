import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense, getDashboardData } from "../apis/expensesApi";
import type { ExpenseInput } from "../types";

export const useDashboardData = (month: string) => {
  return useQuery({
    queryKey: ["expenses", month],
    queryFn: () => getDashboardData(month),
  });
};

export const useCreateExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: ExpenseInput) => createExpense(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["budgets"] }); // expenses affect budgets
    },
  });
};

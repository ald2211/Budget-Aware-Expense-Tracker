import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBudget, getBudgets, upsertBudget } from "../apis/budgetsApi";
import type { BudgetInput } from "../types";
import { getCategories } from "../apis/categoriesApi";

export const useCategories = () => {
  return useQuery({ queryKey: ["categories"], queryFn: getCategories });
};
export const useBudgets = (month: string) => {
  return useQuery({
    queryKey: ["budgets", month],
    queryFn: () => getBudgets(month),
  });
};

export const useUpsertBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: BudgetInput) => upsertBudget(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

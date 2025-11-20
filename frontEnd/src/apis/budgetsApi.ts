import type {
  BudgetInput,
  BudgetResponse,
  BudgetsListResponse,
} from "../types";
import axios from "./axios/axios";
import { AxiosError } from "axios";

//get budgets
export const getBudgets = async (
  month: string
): Promise<BudgetsListResponse> => {
  try {
    const res = await axios.get<BudgetsListResponse>(`/api/v1/budgets?month=${month}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch budgets."
      );
    }
    throw new Error("Unexpected error");
  }
};

export const upsertBudget = async (
  values: BudgetInput
): Promise<BudgetResponse> => {
  try {
    const res = await axios.post<BudgetResponse>("/api/v1/budgets", values);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to save budget."
      );
    }
    throw new Error("Unexpected error");
  }
};

// delete budget
export const deleteBudget = async (id: string) => {
  try {
    const res = await axios.delete(`/api/v1/budgets/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to delete budget."
      );
    }
    throw new Error("Unexpected error");
  }
};

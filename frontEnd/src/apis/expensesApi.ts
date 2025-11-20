import type {
  CreateExpenseResponse,
  DashBoardListResponse,
  ExpenseInput,
} from "../types";
import axios from "./axios/axios";
import { AxiosError } from "axios";

//get dashboard data
export const getDashboardData = async (
  month: string
): Promise<DashBoardListResponse> => {
  try {
    const res = await axios.get<DashBoardListResponse>(
      `/api/v1/expenses?month=${month}`
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch data.");
    }
    throw new Error("Unexpected error");
  }
};

export const createExpense = async (
  values: ExpenseInput
): Promise<CreateExpenseResponse> => {
  try {
    const res = await axios.post<CreateExpenseResponse>(
      "/api/v1/expenses",
      values
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to create expense."
      );
    }
    throw new Error("Unexpected error");
  }
};

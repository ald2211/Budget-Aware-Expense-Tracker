import type {
  DashBoardListResponse,
} from "../types";
import axios from "./axios/axios";
import { AxiosError } from "axios";

//get report
export const getReport = async (
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

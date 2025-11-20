import type { LoginData, LoginResponse } from "../types";
import axios from "./axios/axios";
import { AxiosError } from "axios";

export const loginApi = async (values: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>("/api/v1/auth/login", values);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }

    throw new Error("An unexpected error occurred. Please try again.");
  }
};

export const signUpApi = async (values: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "/api/v1/auth/register",
      values
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }

    throw new Error("An unexpected error occurred. Please try again.");
  }
};


import type { CategoryResponse, CreateCategoryData, GetCategoriesResponse, UpdateCategoryData } from "../types";
import axios from "./axios/axios";
import { AxiosError } from "axios";


//get category

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  try {
    const response = await axios.get<GetCategoriesResponse>("/api/v1/categories");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to load categories.");
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

//create category

export const createCategory = async (
  values: CreateCategoryData
): Promise<CategoryResponse> => {
  try {
    const response = await axios.post<CategoryResponse>("/api/v1/categories", values);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to create category.");
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

//update category

export const updateCategory = async (
  id: string,
  values: UpdateCategoryData
): Promise<CategoryResponse> => {
  try {
    const response = await axios.put<CategoryResponse>(`/api/v1/categories/${id}`, values);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to update category.");
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

export const deleteCategory = async (id: string): Promise<CategoryResponse> => {
  try {
    const response = await axios.delete<CategoryResponse>(`/api/v1/categories/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to delete category.");
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
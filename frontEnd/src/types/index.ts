export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  user: string;
  success?: boolean;
}

export interface LoginFormProps {
  onSubmit: (data: LoginResponse) => void;
}

export interface CategoryResponse {
  success: boolean;
  message?: string;
  category?: Category;
}

export interface Category {
  _id: string;
  name: string;
  color: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  categories: Category[];
}
export interface CreateCategoryData {
  name: string;
  color: string;
}
export interface UpdateCategoryData {
  name: string;
  color: string;
}


//budget
export interface BudgetInput {
  categoryId: string;
  month: string;
  limit: number;
}

 export interface Budget extends BudgetInput {
  _id: string;
}

export interface BudgetResponse {
  success: boolean;
  budget: Budget;
  message:string;
}

export interface BudgetsListResponse {
  success: boolean;
  budgets: Budget[];
}

//expense 
export interface ExpenseInput {
  categoryId: string;
  amount: number;
  date: string;
}

export interface DashBoardItem {
  category: Category
  spent: number;
  limit: number | null;
  remaining: number | null;
  status: "no_budget" | "within_budget" | "over_budget";
}


export interface DashBoardListResponse {
  dashboardData: DashBoardItem[];
}

export interface CreateExpenseResponse {
  status: "no_budget" | "over_budget" | "within_budget";
  spent: number;
  limit: number | null;
  remaining: number;
}

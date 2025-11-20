import * as Yup from "yup";

//login schema
export const authSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
});

//signup schema
export const signupSchema = authSchema.shape({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

//category schema
export const categorySchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  color: Yup.string().required("Color is required"),
});

//budget schema
export const budgetSchema = Yup.object({
  month: Yup.string().required("Month is required"),
  categoryId: Yup.string().required("Category is required"),
  limit: Yup.number()
    .min(0, "Amount must be positive")
    .required("Limit is required"),
});

//expense schema
export const expenseSchema = Yup.object().shape({
  categoryId: Yup.string().required("Category is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  date: Yup.string().required("Date is required"),
});

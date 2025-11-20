import { useState } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas";
import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../apis/authApi";
import { Failed } from "../../helpers/popup";
import type { LoginResponse, SignupData } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const signUpMutation = useMutation<LoginResponse, Error, SignupData>({
    mutationFn: signUpApi,
    onSuccess: (response) => {
      login(response); // store token & user in context
      navigate("/");
    },
    onError: (error) => {
      Failed(error.message || "SignUp failed");
    },
  });

  const formik = useFormik<SignupData>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await signUpMutation.mutateAsync(values);
        resetForm();
      } catch (error) {
        if (error instanceof Error) {
          Failed(error.message);
        } else {
          Failed("Login failed");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="space-y-5">
        {/* Email */}
        <div>
          <label className="text-base font-medium text-gray-900">
            Email address
          </label>

          <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter email"
              className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          {errors.email && touched.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-base font-medium text-gray-900">
            Password
          </label>

          <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              className="block w-full py-4 pl-10 pr-12 text-black placeholder-gray-500 transition-all border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
            />

            {/* Show/Hide Icon */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer text-gray-500"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.03-10-9 0-1.662.472-3.287 1.357-4.75m3.017-2.705A9.957 9.957 0 0112 5c5.523 0 10 4.03 10 9 0 1.658-.47 3.274-1.35 4.734M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {errors.password && touched.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
          <label className="text-base font-medium text-gray-900">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full py-4 pl-10 pr-12 text-black placeholder-gray-500 transition-all border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || signUpMutation.isPending}
            className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80"
          >
            {isSubmitting || signUpMutation.isPending ? (
              <span className="absolute w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

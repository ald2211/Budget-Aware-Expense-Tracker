import { Formik, Form, Field } from "formik";
import { X } from "lucide-react";
import { useCreateExpense } from "../hooks/useExpenses";
import { useCategories } from "../hooks/useBudgets";
import type { Category } from "../types";
import { expenseSchema } from "../schemas";
import { Failed, Success } from "../helpers/popup";

interface ExpenseFormProps {
  setShowExpenseForm: (value: boolean) => void;
}
export const ExpenseForm = ({ setShowExpenseForm }: ExpenseFormProps) => {
  const { data: categoriesData } = useCategories();
  const createExpenseMutation = useCreateExpense();

  const categories: Category[] = categoriesData?.categories ?? [];

  // Current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-blend-saturation bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add Expense</h2>
          <button
            onClick={() => setShowExpenseForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            categoryId: categories[0]?._id || "",
            amount: 0,
            date: today,
          }}
          validationSchema={expenseSchema}
          onSubmit={(values, { resetForm }) => {
            createExpenseMutation.mutate(values, {
              onSuccess: (res) => {
                if (res.status === "over_budget") {
                  Failed("Over Budget!");
                } else if (res.status === "no_budget") {
                  Failed("No budget set for this category!");
                } else {
                  Success("Within Budget!");
                }

                resetForm();
                setShowExpenseForm(false);
              },
              onError: (err) => {
                Failed(err.message || "Failed to save expense");
              },
            });
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Field
                  as="select"
                  name="categoryId"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
                {errors.categoryId && touched.categoryId && (
                  <p className="text-red-600 text-sm">{errors.categoryId}</p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <Field
                  name="amount"
                  type="number"
                  step="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="0.00"
                />
                {errors.amount && touched.amount && (
                  <p className="text-red-600 text-sm">{errors.amount}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <Field
                  name="date"
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.date && touched.date && (
                  <p className="text-red-600 text-sm">{errors.date}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

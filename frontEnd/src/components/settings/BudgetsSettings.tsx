import { Formik, Form, Field } from "formik";
import {
  useBudgets,
  useCategories,
  useDeleteBudget,
  useUpsertBudget,
} from "../../hooks/useBudgets";
import { budgetSchema } from "../../schemas";
import { useToast } from "../../hooks/useToast";
import CustomToast from "../../helpers/CustomToast";
import { useState } from "react";
import type { Budget, BudgetResponse, Category } from "../../types";

const BudgetsSettings = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 7);
  });

  const { data: budgetsData } = useBudgets(selectedMonth);
  const { data: categoriesData } = useCategories();

  const budgets: Budget[] = budgetsData?.budgets ?? [];
  const categories: Category[] = categoriesData?.categories ?? [];

  const { toast, showToast } = useToast();

  const upsertMutation = useUpsertBudget();
  const deleteMutation = useDeleteBudget();

  const getBudgetByCategory = (categoryId: string) =>
    budgets.find((b) => b.categoryId === categoryId);

  return (
    <>
      {toast && <CustomToast message={toast.message} type={toast.type} />}

      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Budgets</h1>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {categories.map((category) => {
            const existingBudget = getBudgetByCategory(category._id);

            return (
              <Formik
                key={category._id}
                initialValues={{
                  month: selectedMonth,
                  categoryId: category._id,
                  limit: existingBudget?.limit ?? 0,
                }}
                validationSchema={budgetSchema}
                enableReinitialize
                onSubmit={(values, { resetForm }) => {
                  upsertMutation.mutate(values, {
                    onSuccess: (res: BudgetResponse) => {
                      showToast(res.message, "success");
                      resetForm({ values });
                    },
                    onError: (error: unknown) => {
                      if (error instanceof Error)
                        showToast(error.message, "error");
                      else showToast("Failed to save budget", "error");
                    },
                  });
                }}
              >
                {({ values, initialValues, setFieldValue }) => {
                  const hasChanged = values.limit !== initialValues.limit;
                  const hasExistingBudget = !!existingBudget;

                  return (
                    <Form className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-b">
                      {/* Category */}
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium text-gray-800">
                          {category.name}
                        </span>
                      </div>

                      {/* Input */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">INR</span>
                        <Field
                          name="limit"
                          type="number"
                          step="1"
                          className="w-32 border border-gray-300 rounded px-3 py-1"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 self-end md:self-auto">
                        {hasChanged && (
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                        )}

                        {hasExistingBudget && (
                          <button
                            type="button"
                            onClick={() => {
                              deleteMutation.mutate(existingBudget._id, {
                                onSuccess: () => {
                                  showToast("Budget deleted", "success");
                                  setFieldValue("limit", 0);
                                },
                                onError: () =>
                                  showToast("Delete failed", "error"),
                              });
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BudgetsSettings;

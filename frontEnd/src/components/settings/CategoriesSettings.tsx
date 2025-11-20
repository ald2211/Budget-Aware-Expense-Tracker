import { useState } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../apis/categoriesApi";
import type { Category, UpdateCategoryData } from "../../types";
import { categorySchema } from "../../schemas";
import { Failed, Success } from "../../helpers/popup";

const CategoriesSettings = () => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();

  // GET categories
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const categories = data?.categories ?? [];
  // CREATE
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setShowForm(false);
      Success("category added successfully");
    },
    onError: (error) => {
      Failed(error.message || "Create category failed");
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: UpdateCategoryData }) =>
      updateCategory(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setEditingCategory(null);
      setShowForm(false);
      Success("category updated success fully");
    },
    onError: (error) => {
      Failed(error.message || "Update Category Failed");
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      Success("category deleted successfully");
    },
    onError: (error) => {
      Failed(error.message || "delete Category Failed");
    },
  });

  const openAddForm = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const openEditForm = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>

        <button
          onClick={openAddForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Category list */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {categories.map((cat: Category) => (
          <div
            key={cat._id}
            className="flex items-center justify-between p-4 border-b hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="font-medium text-gray-800">{cat.name}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEditForm(cat)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit2 size={18} />
              </button>

              <button
                onClick={() => deleteMutation.mutate(cat._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>

            <Formik
              initialValues={{
                name: editingCategory?.name || "",
                color: editingCategory?.color || "#3b82f6",
              }}
              validationSchema={categorySchema}
              onSubmit={(values) => {
                if (editingCategory) {
                  updateMutation.mutate({ id: editingCategory._id, values });
                } else {
                  createMutation.mutate(values);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <Field
                      name="name"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-600 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Color</label>
                    <Field
                      type="color"
                      name="color"
                      className="w-full h-10 border rounded-lg"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      {editingCategory ? "Update" : "Create"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesSettings;

import { useState } from "react";
import CategoriesSettings from "./CategoriesSettings";
import BudgetsSettings from "./BudgetsSettings";

 // Settings Component
  export const SettingsView = () => {
    const [settingsTab, setSettingsTab] = useState<'categories' | 'budgets'>('categories');

    return (
      <div>
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-4">
              <button
                onClick={() => setSettingsTab('categories')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  settingsTab === 'categories'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setSettingsTab('budgets')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  settingsTab === 'budgets'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Budgets
              </button>
            </div>
          </div>
        </div>
        {settingsTab === 'categories' ? <CategoriesSettings /> : <BudgetsSettings/>}
      </div>
    );
  };
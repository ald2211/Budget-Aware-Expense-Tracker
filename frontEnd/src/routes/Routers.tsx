import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import NotFound from "../components/NotFound";

import { ProtectedRoute } from "./ProtectedRoute";
import { UnProtectedRoute } from "./UnProtectedRoute";

import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignUpPage";

import { Dashboard } from "../components/Dashboard";
import { Reports } from "../components/Reports";
import { SettingsView } from "../components/settings/SettingView";
import { LayoutRoute } from "../components/layout/LayoutRoute";

const Routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <UnProtectedRoute>
            <LoginPage />
          </UnProtectedRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <UnProtectedRoute>
            <SignupPage />
          </UnProtectedRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <LayoutRoute />
          </ProtectedRoute>
        }
      >
        {/* All these pages will use the new layout */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Reports />} />
        <Route path="/settings" element={<SettingsView />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default Routers;

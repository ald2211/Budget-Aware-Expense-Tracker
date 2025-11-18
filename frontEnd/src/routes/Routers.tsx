import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import NotFound from "../components/NotFound";

import Test from "../components/Test";

import { ProtectedRoute } from "../routes/ProtectedRoute";
import { UnProtectedRoute } from "./UnProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignUpPage";

const Routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes (only for logged-out users) */}
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

      {/* Protected Routes (only for logged-in users) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Test />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default Routers;

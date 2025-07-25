import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyFreelancer from './pages/ApplyFreelancer';
import NotificationPage from "./pages/NotificationPage";
import User from "./pages/admin/user";
import Freelancer from "./pages/admin/freelancer";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="mx-4 sm:mx-4">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          className:
            "bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg text-sm cursor",
          success: {
            className: "bg-green-600",
          },
          error: {
            className: "bg-red-600",
          },
        }}
        reverseOrder={false}
      />
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/apply-freelancer"
              element={
                <ProtectedRoute>
                  <ApplyFreelancer />
                </ProtectedRoute>
              }
            />
             <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
                 <Route
              path="/admin/freelancer"
              element={
                <ProtectedRoute>
                  <Freelancer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;

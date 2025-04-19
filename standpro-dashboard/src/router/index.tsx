import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/layouts";

const LoadComponent = (Component: React.ComponentType) => {
  return (
    <React.Suspense fallback={<p>Loading</p>}>
      <Component />
    </React.Suspense>
  );
};

/**
 * Error Page
 */
const ErrorPage = LoadComponent(React.lazy(() => import("@/views/system/ErrorPage")));

/**
 * Auth Pages
 */
const LoginPage = LoadComponent(React.lazy(() => import("@/views/auth/LoginPage")));

/**
 * Dashboard Pages
 */
const DashboardHomePage = LoadComponent(React.lazy(() => import("@/views/dashboard/HomePage")));
const FileRecordLogFormPage = LoadComponent(React.lazy(() => import("@/views/dashboard/files/FileRecordLogFormPage")));
const FilesIncomingPage = LoadComponent(React.lazy(() => import("@/views/dashboard/files/FilesIncomingPage")));
const FilesOutgoingPage = LoadComponent(React.lazy(() => import("@/views/dashboard/files/FilesOutgoingPage")));
const FilesReportsPage = LoadComponent(React.lazy(() => import("@/views/dashboard/files/FilesReportsPage")));

export default createBrowserRouter([
  {
    path: "*",
    element: ErrorPage,
  },
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: LoginPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: DashboardHomePage,
      },
      {
        path: "/dashboard/files/form",
        element: FileRecordLogFormPage,
      },
      {
        path: "/dashboard/files/form/:id/edit",
        element: FileRecordLogFormPage,
      },
      {
        path: "/dashboard/files/incoming",
        element: FilesIncomingPage,
      },
      {
        path: "/dashboard/files/outgoing",
        element: FilesOutgoingPage,
      },
      {
        path: "/dashboard/files/reports",
        element: FilesReportsPage,
      },
    ],
  },
]);

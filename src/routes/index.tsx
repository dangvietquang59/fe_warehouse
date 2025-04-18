import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

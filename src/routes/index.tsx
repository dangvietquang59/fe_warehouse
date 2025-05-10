import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import BlankLayout from "@/layouts/BlankLayout";
import Login from "@/pages/Login";

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
  {
    path:'/auth',
    element: <BlankLayout/>,
    children:[
      {
        path:"sign-in", element:<Login/>
      }
    ]
  }
]);

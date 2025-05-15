import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import BlankLayout from '@/layouts/BlankLayout';
import { RequireAuth, RedirectIfAuth } from '@/components/common/AuthCheck';

// const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Login = lazy(() => import('@/pages/Login'));
const Logup = lazy(() => import('@/pages/Logup'));
const Products = lazy(() => import('@/pages/Products'));
const Categories = lazy(() => import('@/pages/Categories'));
const Orders = lazy(() => import('@/pages/Orders'));
const Suppliers = lazy(() => import('@/pages/Suppliers'));
const Employees = lazy(() => import('@/pages/Employees'));
export const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth />,
        children: [
            {
                path: '/',
                element: <MainLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'products', element: <Products /> },
                    { path: 'categories', element: <Categories /> },
                    { path: 'orders', element: <Orders /> },
                    { path: 'suppliers', element: <Suppliers /> },
                    { path: 'employees', element: <Employees /> },
                ],
            },
        ],
    },
    {
        path: '/auth',
        element: <RedirectIfAuth />,
        children: [
            {
                element: <BlankLayout />,
                children: [
                    {
                        path: 'sign-in',
                        element: <Login />,
                    },
                    {
                        path: 'sign-up',
                        element: <Logup />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

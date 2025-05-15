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

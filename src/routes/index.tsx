import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import BlankLayout from '@/layouts/BlankLayout';

const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Login = lazy(() => import('@/pages/Login'));
const Logup = lazy(() => import('@/pages/Logup'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'dashboard', element: <Dashboard /> },
        ],
    },
    {
        path: '/auth',
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
]);

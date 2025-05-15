import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import '@/index.css';
import { router } from './routes';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from 'react-hot-toast';
import { Spin } from 'antd';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Suspense
                fallback={
                    <div className="flex h-screen w-screen items-center justify-center">
                        <Spin />
                    </div>
                }
            >
                <RouterProvider router={router} />
            </Suspense>
            <Toaster position="bottom-right" reverseOrder={false} />
        </QueryClientProvider>
    </React.StrictMode>
);

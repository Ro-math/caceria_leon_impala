import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Training from './pages/Training';
import Hunting from './pages/Hunting';
import Knowledge from './pages/Knowledge';
import NotFound from './pages/NotFound';

const LayoutWrapper = () => {
    // Determine title based on path? Or let pages handle it?
    // MainLayout expects a title. We can make it dynamic or generic.
    // For simplicity, let's pass a generic title or use context.
    // Or just let MainLayout handle the title based on route match if we wanted.
    // Here I'll just pass "LeonAI" or let MainLayout default.
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutWrapper />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/training', element: <Training /> },
            { path: '/hunting', element: <Hunting /> },
            { path: '/knowledge', element: <Knowledge /> },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;

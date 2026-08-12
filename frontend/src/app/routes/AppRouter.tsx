import { Route, Routes } from 'react-router-dom'
import type { ReactElement } from "react";
import NotFound from '@/pages/NotFound'
import AuthLayout from '@/features/auth/layouts/AuthLayout';
import LoginPage from '@/features/auth/pages/LoginPage';
import SignUpPage from '@/features/auth/pages/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '@/features/notes/layouts/DashboardLayout';

export default function AppRouter(): ReactElement {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
            </Route>


            <Route element={<ProtectedRoute />} >
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={"dashboardPage"} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
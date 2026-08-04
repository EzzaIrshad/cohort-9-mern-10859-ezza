import { Route, Routes } from 'react-router-dom'
import NotFound from '../../pages/NotFound'
import type { ReactElement } from "react";
import AuthLayout from '../../features/auth/layouts/AuthLayout';
import LoginPage from '../../features/auth/pages/LoginPage';
import SignUpPage from '../../features/auth/pages/RegisterPage';

export default function AppRouter(): ReactElement {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
            </Route>

            
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
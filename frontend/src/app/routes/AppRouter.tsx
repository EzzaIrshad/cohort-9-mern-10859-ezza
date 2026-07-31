import { Route, Routes } from 'react-router-dom'
import NotFound from '../../pages/NotFound'
import type { ReactElement } from "react";

export default function AppRouter(): ReactElement {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
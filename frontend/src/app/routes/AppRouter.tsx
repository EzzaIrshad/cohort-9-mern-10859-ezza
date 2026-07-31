import { Route, Routes } from 'react-router-dom'
import NotFound from '../../pages/NotFound'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
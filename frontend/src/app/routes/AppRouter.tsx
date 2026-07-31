import { Route, Routes } from 'react-router-dom'

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
        </Routes>
    )
}
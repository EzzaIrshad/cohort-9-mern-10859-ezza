import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
    return (
        <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        </>
    )
}

export default DashboardLayout;
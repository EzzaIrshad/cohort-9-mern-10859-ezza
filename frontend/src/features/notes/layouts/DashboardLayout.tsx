import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import type { ReactElement } from "react";

const DashboardLayout = (): ReactElement => {
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
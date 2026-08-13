import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, type ReactElement } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";

const DashboardLayout = (): ReactElement => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);
    
    return (
        <>
        <Navbar search={search} onSearch={setSearch}/>
        <main>
            <Outlet context={{search: debouncedSearch }}/>
        </main>
        </>
    )
}

export default DashboardLayout;
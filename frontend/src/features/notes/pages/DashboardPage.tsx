import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useGetNotes } from "../hooks/useGetNotes";
import { Plus } from "lucide-react";
import NotesPanel from "../components/NotesPanel";
import { useEffect, useState } from "react";

interface DashboardContext {
    search: string;
}

const DashboardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { search } = useOutletContext<DashboardContext>();

    const [tab, setTab] = useState("all-notes");

    useEffect(() => {
        const stateTab = (location.state as { tab?: string } | null)?.tab;
        if (stateTab) {
            setTab(stateTab);
            navigate(location.pathname, { replace: true, state: null })
        }
    }, [location.state, location.pathname, navigate])

    const { data, isLoading } = useGetNotes({
        search: search || undefined,
        isPinned: tab === "pinned" ? true : undefined,
    });
    return (
        <div className="min-h-screen bg-background">

            <NotesPanel
                notes={data?.data ?? []}
                isLoading={isLoading}
                tab={tab}
                setTab={setTab}
                search={search}
            />

            {/* Floating New Note button */}
            <Link
                to={`/notes/new`}
                aria-label="Create new note"
                className="fixed bottom-6 right-6 z-50 inline-flex items-center rounded-full p-4 text-sm font-semibold 
                    bg-accent border border-pink text-white icon-container-shadow transition hover:-translate-y-1 sm:bottom-8 sm:right-8"
            >
                <Plus className="h-5 w-5" strokeWidth={2.75} />
            </Link>
        </div >
    )
}

export default DashboardPage
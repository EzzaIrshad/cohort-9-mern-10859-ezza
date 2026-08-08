import { useGetUser } from "@/features/auth/hooks/useGetUser"
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const { data, isLoading } = useGetUser();
    const location = useLocation();

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!data?.data) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default ProtectedRoute
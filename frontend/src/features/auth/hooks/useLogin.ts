import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface ErrorResponse {
    message: string;
}

// Custom hook to manage user authentication state during login
export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            // Persist the JWT token to local storage for persistent sessions
            localStorage.setItem("token", response.data?.token || "");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            // Display backend error message or fallback to a generic message
            toast.error(error.response?.data.message ?? "Something went wrong.");
        }
    });
};
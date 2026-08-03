import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth.api";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
    message: string;
}

// Custom hook to manage user authentication state during registration
export const useRegister = () => {
    return useMutation({
        mutationFn: register,
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
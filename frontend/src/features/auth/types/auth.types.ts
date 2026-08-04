export interface User {
    id: string;
    fullName: string;
    email: string;
}

export interface AuthData {
    token: string;
    user: User;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export type RegisterResponse = ApiResponse<AuthData>;

export type LoginResponse = ApiResponse<AuthData>;
import {api} from '../../../shared/api/axiosInstance';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse
} from '../types/auth.types';

// call api to send credentials for new profile
export const register = async (data: RegisterRequest): Promise<RegisterResponse> =>{
    
    const response = await api.post<RegisterResponse>('/auth/register', data);

    return response.data;

}

// call api to authenticate credentials for login
export const login = async (data: LoginRequest): Promise<LoginResponse> =>{

    const response = await api.post<LoginResponse>('/auth/login', data);

    return response.data;

}
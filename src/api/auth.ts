import axios from 'axios';
import { apiURL } from './config';
import handleServerError from './handleServerError';

export type LoginResponse = { refresh_token: string; access_token: string };

export async function login(email: string, password: string): Promise<LoginResponse> {
    const promise = axios.post<LoginResponse>(`${apiURL}/auth/sessions`, { email, password });
    const response = await handleServerError(promise);
    return response.data;
}

export async function logout(refreshToken: string): Promise<LoginResponse> {
    const promise = axios.delete<LoginResponse>(`${apiURL}/auth/sessions`, {
        headers: {
            Authorization: 'Bearer ' + refreshToken,
        },
    });
    const response = await handleServerError(promise);
    return response.data;
}

import axios from 'axios';
import { withAuthorizationToken } from './auth';
import { apiURL } from './config';
import handleServerError from './handleServerError';
import type { Profile } from './types/profile/profile';

export async function getProfile(accessToken: string): Promise<Profile> {
    const url = `${apiURL}/user/profile`;

    const promise = axios.get<Profile>(url, {
        headers: {
            ...withAuthorizationToken(accessToken),
        },
    });
    const response = await handleServerError(promise);

    response.data.inserted = new Date(response.data.inserted);

    return response.data;
}

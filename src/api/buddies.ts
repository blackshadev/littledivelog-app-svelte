import axios from 'axios';
import { withAuthorizationToken } from './auth';
import { apiURL } from './config';
import handleServerError from './handleServerError';
import type { BuddySummary } from './types/buddies/BuddySummary';

export async function listBuddies(accessToken: string): Promise<BuddySummary[]> {
    const promise = axios.get<BuddySummary[]>(`${apiURL}/buddies`, {
        headers: {
            ...withAuthorizationToken(accessToken),
        },
    });
    const response = await handleServerError(promise);

    return response.data;
}

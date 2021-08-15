import { getAccessToken, getRefreshToken, setAccessToken } from '../../stores/auth';
import { get } from 'svelte/store';
import * as auth from '../../api/auth';
import AuthenticationError from '../../api/errors/AuthenticationError';

export async function withAccessToken<T extends unknown[], R>(
    fn: (token: string, ...args: T[]) => Promise<R>,
    ...args: T[]
): Promise<R> {
    let accessToken = get(getAccessToken);
    const refreshToken = get(getRefreshToken);
    if (!accessToken || !refreshToken) {
        throw new Error('No refresh or access token');
    }

    try {
        return await fn(accessToken, ...args);
    } catch (err) {
        if (err instanceof AuthenticationError) {
            accessToken = await refreshAccessToken(refreshToken);
            return await fn(accessToken, ...args);
        }

        throw err;
    }
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
    const accessToken = await auth.getAccessToken(refreshToken);
    setAccessToken(accessToken);

    return accessToken;
}

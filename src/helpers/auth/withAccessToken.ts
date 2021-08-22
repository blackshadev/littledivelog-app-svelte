import { get } from 'svelte/store';

import * as auth from '../../api/auth';
import AuthenticationError from '../../api/errors/AuthenticationError';
import { getAccessToken, getRefreshToken, setAccessToken } from '../../stores/auth';

export function withAccessToken<T extends unknown[], R>(
    fn: (token: string, ...args: T) => Promise<R>
): (...args: T) => Promise<R> {
    const accessToken = get(getAccessToken);
    const refreshToken = get(getRefreshToken);
    if (!accessToken || !refreshToken) {
        throw new Error('No refresh or access token');
    }

    let token = accessToken;
    return async (...args: T) => {
        try {
            return await fn(token, ...args);
        } catch (err) {
            if (err instanceof AuthenticationError) {
                token = await refreshAccessToken(refreshToken);
                return await fn(token, ...args);
            }

            throw err;
        }
    };
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
    const accessToken = await auth.getAccessToken(refreshToken);
    setAccessToken(accessToken);

    return accessToken;
}

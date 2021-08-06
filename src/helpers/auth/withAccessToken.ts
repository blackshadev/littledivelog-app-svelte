import { AuthException } from '../../api/auth';
import { getAccessToken, getRefreshToken, setAccessToken } from '../../stores/auth';
import getStoreValue from '../../stores/getStoreValue';
import * as auth from '../../api/auth';

export async function withAccessToken<T extends unknown[], R>(
    fn: (token: string, ...args: T[]) => Promise<R>,
    ...args: T[]
): Promise<R> {
    let accessToken = getStoreValue(getAccessToken);
    const refreshToken = getStoreValue(getRefreshToken);
    if (!accessToken || !refreshToken) {
        throw new Error('No refresh or access token');
    }

    try {
        return await fn(accessToken, ...args);
    } catch (err) {
        if (err instanceof AuthException) {
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

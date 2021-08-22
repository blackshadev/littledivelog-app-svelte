import axios from 'axios';

import { withAuthorizationToken } from './auth';
import { apiURL } from './config';
import handleServerError from './handleServerError';
import type { DiveDetail } from './types/dives/DiveDetail';
import type { DiveSummary } from './types/dives/DiveSummary';

export async function listDives(accessToken: string): Promise<DiveSummary[]> {
    const promise = axios.get<DiveSummary[]>(`${apiURL}/dives/`, {
        headers: {
            ...withAuthorizationToken(accessToken),
        },
    });
    const response = await handleServerError(promise);

    return response.data;
}

export async function getDive(accessToken: string, diveId: number): Promise<DiveDetail> {
    const promise = axios.get<DiveDetail>(`${apiURL}/dives/${diveId}`, {
        headers: {
            ...withAuthorizationToken(accessToken),
        },
    });
    const response = await handleServerError(promise);

    return response.data;
}

import axios from 'axios';
import { withAuthorizationToken } from './auth';
import { apiURL } from './config';
import handleServerError from './handleServerError';
import type { Tag } from './tags';

export type DiveSummary = {
    dive_id: number;
    divetime: number;
    date: Date;
    tags: Tag[];
    place: { place_id: number; name: string; country_code: string } | null;
};

export async function listDives(accessToken: string): Promise<DiveSummary[]> {
    const promise = axios.get<DiveSummary[]>(`${apiURL}/dives/`, {
        headers: {
            ...withAuthorizationToken(accessToken),
        },
    });
    const response = await handleServerError(promise);

    return response.data;
}

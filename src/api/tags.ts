import axios from 'axios';
import { withAuthorizationToken } from './auth';
import { apiURL } from './config';
import handleServerError from './handleServerError';
import type { TagSummary } from './types/tags/TagSummary';

export async function listTags(accessToken: string): Promise<TagSummary[]> {
    const promise = axios.get<TagSummary[]>(`${apiURL}/tags`, {
        headers: {
            ...withAuthorizationToken(accessToken),
        },
    });
    const response = await handleServerError(promise);

    return response.data.map((tag) => {
        tag.last_dive = new Date(tag.last_dive);
        return tag;
    });
}

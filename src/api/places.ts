import axios from 'axios';
import { withAuthorizationToken } from './auth';
import { apiURL } from './config';
import handleServerError from './handleServerError';
import type { Country, Place } from './types/places/country';

export async function getCountries(accessToken: string): Promise<Country[]> {
    const promise = axios.get<Country[]>(`${apiURL}/countries/`, {
        headers: {
            ...withAuthorizationToken(accessToken),
        },
    });
    const response = await handleServerError(promise);

    return response.data;
}

export async function getPlaces(accessToken: string, filterValue?: string, country?: string): Promise<Place[]> {
    let url = `${apiURL}/places`;
    const params = {
        keywords: filterValue,
        country,
    };

    if (filterValue) {
        url = `${apiURL}/places/_search`;
    } else if (country) {
        url = `${apiURL}/places/${country}`;
    }

    const promise = axios.get<Place[]>(url, {
        headers: {
            ...withAuthorizationToken(accessToken),
        },
        params,
    });
    const response = await handleServerError(promise);

    return response.data;
}

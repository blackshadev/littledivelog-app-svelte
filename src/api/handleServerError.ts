/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { AuthException } from './auth';
import { FieldsError } from './errors/fieldError';

export default async function handleServerError<T>(result: Promise<T>): Promise<T> {
    try {
        return await result;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            if (err.response.status === 401) {
                throw new AuthException();
            }

            if (typeof err.response.data !== 'object') {
                throw err;
            }

            if (err.response.data?.errors) {
                throw new FieldsError(err.response.data.errors);
            }

            if (err.response.data?.message) {
                throw new Error(err.response.data.message);
            }
        }
        throw err;
    }
}

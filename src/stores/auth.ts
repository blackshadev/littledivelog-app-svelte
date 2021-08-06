import { derived, writable } from 'svelte/store';
import persistedStore from './persistance';

type StoreValue = { accessToken?: string; refreshToken?: string } | undefined;

const persistance = persistedStore<StoreValue>('auth');

export const tokenStore = writable<StoreValue>(persistance.value);

export const getAccessToken = derived(tokenStore, (tokens) => tokens?.accessToken);
export const getRefreshToken = derived(tokenStore, (tokens) => tokens?.refreshToken);
export const getIsLoggedIn = derived(tokenStore, (tokens) => !!tokens?.accessToken);

export function setAccessToken(accessToken: string): void {
    tokenStore.update((tokens) => ({ ...tokens, accessToken: accessToken }));
}

export function setTokens(tokens: StoreValue): void {
    tokenStore.set(tokens);
}

export function reset(): void {
    tokenStore.set(undefined);
}

tokenStore.subscribe(persistance.persist);

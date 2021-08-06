import type { Readable } from 'svelte/store';

export default function getStoreValue<T>(store: Readable<T>): T | undefined {
    let value: T | undefined = undefined;
    const unsubscribe = store.subscribe((val) => (value = val));
    unsubscribe();

    return value;
}

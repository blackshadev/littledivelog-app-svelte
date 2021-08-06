const prefix = 'ldl';

export function saveStore<T>(key: string): (value: T | undefined) => void {
    return function (value: T | undefined) {
        if (value === undefined) {
            localStorage.removeItem(`${prefix}-${key}`);
        } else {
            localStorage.setItem(`${prefix}-${key}`, JSON.stringify(value));
        }
    };
}

export function loadStore<T>(key: string): T | undefined {
    const value = localStorage.getItem(`${prefix}-${key}`);

    if (!value) {
        return undefined;
    }

    return JSON.parse(value) as T;
}

export default function persistedStore<T>(key: string): {
    persist(this: void, value: T | undefined): void;
    value: T | undefined;
} {
    return {
        persist: saveStore(key),
        value: loadStore(key),
    };
}

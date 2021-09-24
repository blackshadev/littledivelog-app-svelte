export function disjunction<T, K>(a: T[], b: T[], key: (k: T) => K): T[] {
    const keys = new Set(b.map(key));
    return a.filter((item) => !keys.has(key(item)));
}

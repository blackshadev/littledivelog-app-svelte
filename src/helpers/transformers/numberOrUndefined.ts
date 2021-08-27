export default function numberOrUndefined(value: unknown): number | undefined {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string' && !Number.isNaN(Number(value))) {
        return Number(value);
    }

    return undefined;
}

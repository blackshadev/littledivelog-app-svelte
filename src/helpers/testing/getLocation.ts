import { location } from 'svelte-spa-router';
import { get } from 'svelte/store';

export default function getLocation(): string {
    return get(location);
}

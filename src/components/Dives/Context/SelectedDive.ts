import { getContext, setContext } from 'svelte';
import { Writable, writable } from 'svelte/store';

const key = Symbol();

export type SelectedDiveContext = {
    diveId: Writable<number | undefined>;
};

export function setSelectedDiveContext(): SelectedDiveContext {
    const diveId = writable<number | undefined>(undefined);
    const context: SelectedDiveContext = {
        diveId,
    };

    setContext<SelectedDiveContext>(key, context);

    return context;
}

export function getSelectedDiveContext(): SelectedDiveContext {
    return getContext<SelectedDiveContext>(key);
}

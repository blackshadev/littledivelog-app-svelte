import { getContext, setContext } from 'svelte';
import { Writable, writable } from 'svelte/store';

const key = Symbol();

export type SelectedDiveContext = {
    diveId: Writable<number>;
};

export function setSelectedDiveContext(): SelectedDiveContext {
    const context = {
        diveId: writable<number>(),
    };

    setContext<SelectedDiveContext>(key, context);

    return context;
}

export function getSelectedDiveContext(): SelectedDiveContext {
    return getContext<SelectedDiveContext>(key);
}

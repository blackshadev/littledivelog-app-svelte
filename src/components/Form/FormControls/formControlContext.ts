import { getContext, setContext } from 'svelte';
import { Writable, writable } from 'svelte/store';

const key = Symbol();

export type FormControlContext = {
    invalid: Writable<boolean>;
    focussed: Writable<boolean>;
};

export function setFormControlContext(): FormControlContext {
    const context: FormControlContext = {
        invalid: writable(false),
        focussed: writable(false),
    };

    setContext<FormControlContext>(key, context);

    return context;
}

export function getFormControlContext(): FormControlContext {
    return getContext<FormControlContext>(key);
}

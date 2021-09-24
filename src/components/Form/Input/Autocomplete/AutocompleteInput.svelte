<script lang="ts">
    import { onMount } from 'svelte';
    import psuedorandomString from '../../../../helpers/string/randomString';
    import { getFormControlContext } from '../../FormControls/formControlContext';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher<Value>();

    type Value = any;
    type Option = {
        label: string;
        value: Value;
    };

    export let value: Value | undefined = undefined;
    export let filterValue: string = '';
    export let name: string | undefined = undefined;
    export let inputClassName: string | undefined = undefined;
    export let id: string;
    export let placeholder: string = '';
    export let options: Option[];
    export let label: string | undefined = undefined;
    export let clientFilter: boolean = false;
    export let getKey: (value: Value) => string = (value) => value;

    let { focussed } = getFormControlContext();

    let isOpen = false;
    let container: HTMLElement;
    let input: HTMLInputElement;

    const listId = psuedorandomString();
    let hoverIndex: number = -1;
    let activeDescendant: string | undefined;
    $: activeDescendant = hoverIndex > -1 ? `${listId}-${hoverIndex}` : undefined;

    function selectValue(newValue: Value) {
        setValue(newValue);
        dispatch('selectValue', newValue);
    }

    function setValue(newValue: Value) {
        value = newValue;
        hoverIndex = 0;
        const key = value ? getKey(newValue) : undefined;
        filterValue = options.find((option) => key === getKey(option.value))?.label ?? '';
    }

    function navigate(direction: -1 | 1) {
        if (!isOpen) {
            open();
            return;
        }

        let newIndex = hoverIndex + direction;
        if (newIndex >= options.length || newIndex < 0) {
            return;
        }

        hoverIndex += direction;
    }

    function close() {
        isOpen = false;
        hoverIndex = -1;
    }

    function open() {
        if (isOpen) {
            return;
        }

        isOpen = true;
        hoverIndex = 0;
    }

    function handleKeydown(ev: KeyboardEvent) {
        open();

        switch (ev.key) {
            case 'ArrowUp':
                ev.preventDefault();
                ev.stopImmediatePropagation();
                navigate(-1);
                break;
            case 'ArrowDown':
                ev.preventDefault();
                ev.stopImmediatePropagation();
                navigate(1);
                break;
            case 'Escape':
                ev.preventDefault();
                selectValue(value);

                break;
            case 'Enter':
                ev.preventDefault();
                selectValue(options[hoverIndex].value);
                break;
        }
    }

    function handleBlur(ev: FocusEvent) {
        if (ev.relatedTarget && container.contains(ev.relatedTarget as Node)) {
            return;
        }

        if (filterValue === undefined) {
            value = undefined;
        }
        selectValue(value);
    }

    $: {
        if (value && options && clientFilter) {
            setValue(value);
        }
    }
    onMount(() => {
        if (value && options) {
            setValue(value);
        }
    });

    let filteredOptions: Option[] = options;
    $: {
        if (clientFilter) {
            if (!filterValue) {
                filteredOptions = options;
            } else {
                const regex = new RegExp(filterValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
                filteredOptions = options.filter((opt) => {
                    return regex.test(opt.label) || regex.test(opt.value);
                });
            }
        } else {
            filteredOptions = options;
        }
    }

    function handleWindowFocus(event: FocusEvent) {
        const eventTarget = event.target as Node;

        const withinContainer = eventTarget && container.contains(eventTarget);
        $focussed = isOpen = withinContainer;
    }

    function handleWindowClick(event: MouseEvent) {
        const eventTarget = event.target as Node;

        const withinContainer = eventTarget && container.contains(eventTarget);
        $focussed = isOpen = withinContainer;
    }
</script>

<svelte:window on:focusin={handleWindowFocus} on:click={handleWindowClick} />

<div class="c-autocomplete-input" class:--is-open={isOpen} bind:this={container}>
    <input
        {id}
        {name}
        {placeholder}
        role="combobox"
        class={inputClassName}
        aria-label={label}
        aria-expanded={isOpen}
        aria-autocomplete="list"
        autocomplete="off"
        aria-controls={listId}
        aria-activedescendant={activeDescendant}
        bind:this={input}
        bind:value={filterValue}
        on:keydown={handleKeydown}
        on:blur={handleBlur}
        on:click={open}
    />
    <ul id={listId} role="listbox" aria-label={label} data-testid="listbox">
        {#each filteredOptions as option, index}
            <li
                role="listitem"
                id="{listId}-{index}"
                aria-posinset={index}
                aria-setsize={filteredOptions.length}
                aria-selected={value === option.value}
                tabindex="-1"
                data-value={option.value}
                class:hover={hoverIndex === index}
                class:active={value === option.value}
                on:click={() => {
                    selectValue(option.value);
                    setTimeout(() => close());
                }}
                on:mouseenter={() => (hoverIndex = index)}
            >
                {option.label}
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    @import '../../../../styling/1-settings/all.scss';

    .c-autocomplete-input {
        position: relative;

        ul {
            z-index: 2;
            display: none;
            position: absolute;
            top: 100%;
            left: $space-sm;
            right: $space-sm;
            max-height: 10rem;
            overflow: auto;
            background: var(--background);
            color: var(--foreground);
            border: 1px solid var(--gray);
            border-radius: 0 0 $rounded $rounded;

            li {
                padding: $space-sm;
                cursor: pointer;

                &.hover {
                    background-color: var(--hover);
                }

                &.active {
                    background-color: var(--selected);
                }
            }
        }

        &.--is-open {
            ul {
                display: inline-block;
            }
        }
    }
</style>

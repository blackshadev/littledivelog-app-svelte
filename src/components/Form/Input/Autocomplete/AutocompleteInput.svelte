<script lang="ts">
    import { hover } from '@testing-library/user-event/dist/hover';
    import psuedorandomString from '../../../../helpers/string/randomString';

    import { getFormControlContext } from '../../FormControls/formControlContext';

    import TextInput from '../Text/TextInput.svelte';

    type Value = any;
    type Option = {
        label: string;
        value: Value;
    };

    export let value: string | undefined = undefined;
    export let filterValue: string = '';
    export let inputClassName: string | undefined = undefined;
    export let id: string;
    export let name: string;
    export let placeholder: string = '';
    export let options: Option[];
    export let label: string | undefined = undefined;

    const { focussed } = getFormControlContext();
    let isOpen = false;
    $: $focussed ? open() : close();

    const listId = psuedorandomString();
    let hoverIndex: number = -1;
    let activeDescendant: string | undefined;
    $: activeDescendant = hoverIndex > -1 ? `${listId}-${hoverIndex}` : undefined;

    function selectItem(newValue: Value) {
        value = newValue;
        hoverIndex = 0;
        filterValue = options.find((option) => newValue === option.value)?.label ?? '';
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
        isOpen = true;
        hoverIndex = 0;
    }

    function handleKeydown(ev: KeyboardEvent) {
        switch (ev.key) {
            case 'ArrowUp':
                ev.preventDefault();
                navigate(-1);
                break;
            case 'ArrowDown':
                ev.preventDefault();
                navigate(1);
                break;
            case 'Escape':
                ev.preventDefault();
                selectItem(value);
                close();

                break;
            case 'Enter':
                ev.preventDefault();
                selectItem(options[hoverIndex].value);
                close();
                break;
        }
    }

    if (value) {
        selectItem(value);
    }
</script>

<div class="c-autocomplete-input" class:--is-open={isOpen}>
    <TextInput
        {id}
        {name}
        {placeholder}
        role="combobox"
        className={inputClassName}
        attributes={{
            'aria-label': label,
            'aria-expanded': isOpen,
            'aria-autocomplete': 'list',
            autocomplete: 'off',
            'aria-control': listId,
            'aria-activedescendant': activeDescendant,
        }}
        bind:value={filterValue}
        on:keydown={handleKeydown}
    />
    <ul id={listId} role="listbox" aria-label={label} data-testid="listbox">
        {#each options as option, index}
            <li
                role="listitem"
                id="{listId}-{index}"
                aria-posinset={index}
                aria-setsize={options.length}
                aria-selected={value === option.value}
                tabindex="-1"
                data-value={option.value}
                class:hover={hoverIndex === index}
                class:active={value === option.value}
                on:click={() => selectItem(option.value)}
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

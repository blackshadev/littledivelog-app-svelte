import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import AutocompleteInput from './AutocompleteInput.svelte';

function makeOptions(
    opt: {
        value?: string;
        placeholder?: string;
        name?: string;
        label?: string;
        id?: string;
        options?: { label: string; value: string }[];
    } = {}
) {
    return {
        value: opt.value ?? 'text',
        placeholder: opt.placeholder ?? ':placeholder:',
        name: opt.name ?? ':name:',
        label: opt.label ?? ':label:',
        id: opt.id ?? ':id:',
        options: opt.options ?? [],
    };
}

describe('AutocompleteInput', () => {
    test('It renders', () => {
        const options = makeOptions({
            options: [
                { label: 'test1', value: 't1' },
                { label: 'test2', value: 't2' },
            ],
        });
        const { getByRole, getByTestId, getByText } = render(AutocompleteInput, options);

        expect(getByRole('combobox', { name: options.label })).toBeInTheDocument();
        expect(getByTestId('listbox')).toBeInTheDocument();
        expect(getByText('test1')).toBeInTheDocument();
        expect(getByText('test2')).toBeInTheDocument();
        expect(getByText('test1')).not.toBeVisible();
        expect(getByText('test2')).not.toBeVisible();
    });

    test('It pre-selects value', () => {
        const options = makeOptions({
            value: 't2',
            options: [
                { label: 'test1', value: 't1' },
                { label: 'test2', value: 't2' },
            ],
        });
        const { getByRole } = render(AutocompleteInput, options);

        const list = getByRole('combobox', { name: options.label }) as HTMLInputElement;

        expect(list.value).toEqual('test2');
    });

    test('It opens options', async () => {
        const options = makeOptions({
            value: 't2',
            options: [
                { label: 'test1', value: 't1' },
                { label: 'test2', value: 't2' },
            ],
        });
        const { getByRole, getByText } = render(AutocompleteInput, options);

        const input = getByRole('combobox', { name: options.label }) as HTMLInputElement;

        input.focus();

        await tick();

        expect(getByText('test1')).toBeVisible();
        expect(getByText('test2')).toBeVisible();
    });
});

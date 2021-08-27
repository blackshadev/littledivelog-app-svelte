import { fireEvent, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { tick } from 'svelte';
import TextFormControl from './TextFormControl.svelte';

function makeOptions(
    opt: { value?: string; placeholder?: string; digits?: number; name?: string; label?: string } = {}
) {
    return {
        value: opt.value ?? 'text',
        placeholder: opt.placeholder ?? ':placeholder:',
        name: opt.name ?? ':name:',
        label: opt.label ?? ':label:',
    };
}

describe('NumberFormControl', () => {
    test('it renders', () => {
        const options = makeOptions();
        const { getByLabelText, getByRole } = render(TextFormControl, options);

        const element = getByRole('textbox', { name: options.name });

        expect(element).toBeInTheDocument();
        expect(element).toHaveProperty('placeholder', options.placeholder);
        expect(element).toHaveProperty('value', options.value);
        expect(element).toHaveProperty('name', options.name);
        expect(element).toStrictEqual(getByLabelText(options.label));
    });

    describe('user interaction', () => {
        test('Toggles selection', async () => {
            const options = makeOptions();
            const { container, getByRole } = render(TextFormControl, options);

            const containerElement = container.querySelector('p');
            const input = getByRole('textbox', { name: options.name });

            expect(containerElement).not.toHaveClass('--focussed');
            await fireEvent.focus(input);
            expect(containerElement).toHaveClass('--focussed');
            await fireEvent.blur(input);
            expect(containerElement).not.toHaveClass('--focussed');
        });
    });
});

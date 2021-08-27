import { fireEvent, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { tick } from 'svelte';
import NumberFormControl from './NumberFormControl.svelte';

function makeOptions(
    opt: { value?: number; placeholder?: string; digits?: number; name?: string; label?: string } = {}
) {
    return {
        value: opt.value ?? 1.23,
        placeholder: opt.placeholder ?? ':placeholder:',
        digits: opt.digits ?? 2,
        name: opt.name ?? ':name:',
        label: opt.label ?? ':label:',
    };
}

describe('NumberFormControl', () => {
    test('it renders', () => {
        const options = makeOptions();
        const { getByLabelText, getByRole } = render(NumberFormControl, options);

        const element = getByRole('textbox', { name: options.label });

        expect(element).toBeInTheDocument();
        expect(element).toHaveProperty('placeholder', options.placeholder);
        expect(element).toHaveProperty('value', '1.23');
        expect(element).toHaveProperty('name', options.name);
        expect(element).toStrictEqual(getByLabelText(options.label));
    });

    describe('user interaction', () => {
        test('Toggles selection', async () => {
            const options = makeOptions();
            const { container, getByRole } = render(NumberFormControl, options);

            const containerElement = container.querySelector('p');
            const input = getByRole('textbox', { name: options.label });

            expect(containerElement).not.toHaveClass('--focussed');
            await fireEvent.focus(input);
            expect(containerElement).toHaveClass('--focussed');
            await fireEvent.blur(input);
            expect(containerElement).not.toHaveClass('--focussed');
        });

        test('it marks invalid', async () => {
            const options = makeOptions();
            const { container, getByRole } = render(NumberFormControl, options);

            const containerElement = container.querySelector('p');
            const element = getByRole('textbox', { name: options.label });

            userEvent.clear(element);
            userEvent.type(element, 'text');
            await tick();
            expect(element).toHaveProperty('value', 'text');
            expect(containerElement).toHaveClass('--invalid');

            await fireEvent.blur(element);

            expect(element).toHaveProperty('value', 'text');
            expect(containerElement).toHaveClass('--invalid');
        });
    });
});

import { fireEvent, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { tick } from 'svelte';
import NumbericInput from './NumbericInput.svelte';

function makeOptions(
    opt: { value?: number; placeholder?: string; digits?: number; name?: string; label?: string } = {}
) {
    return {
        value: opt.value ?? 1.23,
        placeholder: opt.placeholder ?? ':placeholder:',
        digits: opt.digits ?? 2,
        name: opt.name ?? ':name:',
    };
}

describe('NumbericInput', () => {
    test('it renders', () => {
        const options = makeOptions();
        const { getByRole } = render(NumbericInput, options);

        const element = getByRole('textbox');

        expect(element).toBeInTheDocument();
        expect(element).toHaveProperty('placeholder', options.placeholder);
        expect(element).toHaveProperty('value', '1.23');
        expect(element).toHaveProperty('name', options.name);
    });

    describe('rounding input', () => {
        test('it rounds input up', () => {
            const options = makeOptions({ value: 1.234, digits: 1 });
            const { getByRole } = render(NumbericInput, options);

            const element = getByRole('textbox');
            expect(element).toHaveProperty('value', '1.2');
        });

        test('it rounds input to 0 digits', () => {
            const options = makeOptions({ value: 1.234, digits: 0 });
            const { getByRole } = render(NumbericInput, options);

            const element = getByRole('textbox');
            expect(element).toHaveProperty('value', '1');
        });

        test('it adds zeros when more digits than value', () => {
            const options = makeOptions({ value: 1.234, digits: 5 });
            const { getByRole } = render(NumbericInput, options);

            const element = getByRole('textbox');
            expect(element).toHaveProperty('value', '1.23400');
        });
    });

    describe('user interaction', () => {
        test('it rounds on blur', async () => {
            const options = makeOptions();
            const { getByRole } = render(NumbericInput, options);

            const element = getByRole('textbox');

            userEvent.clear(element);
            userEvent.type(element, '98.7654321');
            await tick();
            expect(element).toHaveProperty('value', '98.7654321');

            await fireEvent.blur(element);

            expect(element).toHaveProperty('value', '98.77');
        });
    });
});

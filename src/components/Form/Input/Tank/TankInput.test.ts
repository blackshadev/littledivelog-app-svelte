import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { DiveTank } from '../../../../api/types/tanks/DiveTank';
import TankInput from './TankInput.svelte';
import TestTankInput from './TestTankInput.svelte';
import { tick } from 'svelte';
import { fireEvent } from '@testing-library/dom';

function makeOptions(opt: { value?: DiveTank } = {}) {
    return {
        value: opt.value ?? {
            pressure: {
                begin: 200,
                end: 50,
                type: 'bar',
            },
            oxygen: 21,
            volume: 10,
        },
    };
}

describe('TankInput', () => {
    test('it renders', () => {
        const { getByRole } = render(TankInput, makeOptions());

        const beginPressure = getByRole('textbox', { name: 'Begin Pressure' });
        const endPressure = getByRole('textbox', { name: 'End Pressure' });
        const volume = getByRole('textbox', { name: 'Volume' });
        const oxygen = getByRole('textbox', { name: 'Oxygen' });
        const type = getByRole('combobox', { name: 'Type' });

        expect(beginPressure).toBeInTheDocument();
        expect(endPressure).toBeInTheDocument();
        expect(volume).toBeInTheDocument();
        expect(oxygen).toBeInTheDocument();
        expect(type).toBeInTheDocument();
    });

    test('it has pressure options', () => {
        const { getByRole } = render(TankInput, makeOptions());

        const barOption = getByRole('option', { name: 'bar' });
        const psiOption = getByRole('option', { name: 'psi' });

        expect(barOption).toBeInTheDocument();
        expect(psiOption).toBeInTheDocument();
    });

    test('it maps values', () => {
        const { getByRole } = render(
            TankInput,
            makeOptions({
                value: {
                    volume: 7,
                    oxygen: 32,
                    pressure: {
                        begin: 222,
                        end: 11,
                        type: 'psi',
                    },
                },
            })
        );

        const beginPressure = getByRole('textbox', { name: 'Begin Pressure' });
        const endPressure = getByRole('textbox', { name: 'End Pressure' });
        const volume = getByRole('textbox', { name: 'Volume' });
        const oxygen = getByRole('textbox', { name: 'Oxygen' });
        const type = getByRole('combobox', { name: 'Type' });

        expect(beginPressure).toHaveValue('222');
        expect(endPressure).toHaveValue('11');
        expect(volume).toHaveValue('7');
        expect(oxygen).toHaveValue('32');
        expect(type).toHaveValue('psi');
    });

    test('it binds values', async () => {
        const { getByRole, getByTestId } = render(TestTankInput);

        const beginPressure = getByRole('textbox', { name: 'Begin Pressure' });
        const endPressure = getByRole('textbox', { name: 'End Pressure' });
        const volume = getByRole('textbox', { name: 'Volume' });
        const oxygen = getByRole('textbox', { name: 'Oxygen' });
        const type = getByRole('combobox', { name: 'Type' });
        const value = getByTestId('value');

        userEvent.clear(beginPressure);
        userEvent.type(beginPressure, '199');
        await tick();

        userEvent.clear(endPressure);
        userEvent.type(endPressure, '11');
        await tick();

        userEvent.clear(volume);
        userEvent.type(volume, '15');
        await tick();

        userEvent.clear(oxygen);
        userEvent.type(oxygen, '31');
        oxygen.blur();
        await tick();

        fireEvent.change(type, { target: { value: 'psi' } });
        await tick();

        expect(value.textContent).toMatch(/"begin":\s199/);
        expect(value.textContent).toMatch(/"end":\s11/);
        expect(value.textContent).toMatch(/"oxygen":\s31/);
        expect(value.textContent).toMatch(/"volume":\s15/);
        expect(value.textContent).toMatch(/"type":\s"psi"/);
    });
});

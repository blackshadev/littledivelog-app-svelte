import { render } from '@testing-library/svelte';
import type { DiveTank } from '../../../api/types/tanks/DiveTank';
import TankInput from './TankInput.svelte';

function makeOptions(
    opt: { value?: DiveTank; placeholder?: string; digits?: number; name?: string; label?: string } = {}
) {
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

        expect(beginPressure).toBeInTheDocument();
        expect(endPressure).toBeInTheDocument();
        expect(volume).toBeInTheDocument();
        expect(oxygen).toBeInTheDocument();
    });
});

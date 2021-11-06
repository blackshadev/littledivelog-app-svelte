import { render } from '@testing-library/svelte';
import type { Profile } from '../../api/types/profile/profile';
import { allGreetings } from '../../helpers/string/greeting';
import Dashboard from './Dashboard.svelte';

describe('Dashboard', () => {
    test('it renders', () => {
        const { getByLabelText, getByTestId } = render(Dashboard, {
            profile: {
                name: ':name:',
                computer_count: 1,
                buddy_count: 2,
                tag_count: 4,
                dive_count: 8,
                email: 'test@email.com',
                inserted: new Date(),
            } as Profile,
        });

        expect(getByLabelText('Dive count')).toHaveTextContent('8');
        expect(getByLabelText('Tag count')).toHaveTextContent('4');
        expect(getByLabelText('Buddy count')).toHaveTextContent('2');
        expect(getByLabelText('Computer count')).toHaveTextContent('1');

        expect(getByTestId('greeting')).toHaveTextContent('Welcome :name:');
        expect(allGreetings).toContain(getByTestId('greeting-text').textContent);
    });
});

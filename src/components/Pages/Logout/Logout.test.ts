import { render } from '@testing-library/svelte';
import Logout from './Logout.svelte';
import { logout } from '../../../api/auth';
import getLocation from '../../../helpers/testing/getLocation';
import Route from '../../Router/routes';
import { tick } from 'svelte';
import { getAccessToken, getIsLoggedIn, getRefreshToken, setTokens } from '../../../stores/auth';
import { get } from 'svelte/store';

jest.mock('../../../api/auth');
const mockLogout = logout as jest.MockedFunction<typeof logout>;

describe('Logout', () => {
    beforeEach(() => {
        mockLogout.mockReset();
    });

    test('it renders', () => {
        const { getByText } = render(Logout);

        expect(getByText('Logging out...')).toBeVisible();
    });

    test('it redirects to login', async () => {
        render(Logout);

        await tick();

        expect(getLocation()).toContain(Route.Login);
    });

    test('it calls logout api with token', async () => {
        setTokens({ refreshToken: ':refresh:', accessToken: ':access:' });

        render(Logout);

        const result = Promise.resolve();
        mockLogout.mockReturnValue(result);

        await result;

        expect(mockLogout).toBeCalledWith(':refresh:');
    });

    test('it does not call api without token', async () => {
        setTokens({ refreshToken: undefined, accessToken: ':access:' });

        render(Logout);

        const result = Promise.resolve();
        mockLogout.mockReturnValue(result);

        await result;

        expect(mockLogout).toBeCalledTimes(0);
    });

    test('it resets tokens after logout', async () => {
        setTokens({ refreshToken: ':refresh:', accessToken: ':access:' });

        render(Logout);

        const result = Promise.resolve();
        mockLogout.mockReturnValue(result);

        await result;

        expect(get(getIsLoggedIn)).toEqual(false);
        expect(get(getRefreshToken)).toEqual(undefined);
        expect(get(getAccessToken)).toEqual(undefined);
    });
});

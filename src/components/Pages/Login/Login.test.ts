import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Login from './Login.svelte';
import { login } from '../../../api/auth';
import AuthenticationError from '../../../api/errors/AuthenticationError';
import { get } from 'svelte/store';
import { getAccessToken, getIsLoggedIn, getRefreshToken } from '../../../stores/auth';

jest.mock('../../../api/auth');
const mockLogin = login as jest.MockedFunction<typeof login>;

describe('Login', () => {
    test('it should render login form', () => {
        const { getByRole } = render(Login);

        expect(getByRole('textbox', { name: 'email' })).toBeInTheDocument();
        expect(getByRole('textbox', { name: 'password' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(getByRole('link', { name: 'Register' })).toBeInTheDocument();
    });

    describe('with api', () => {
        let email: HTMLElement;
        let password: HTMLElement;
        let button: HTMLElement;

        const emailValue = 'test@test.nl';
        const passwordValue = 'password';

        beforeEach(() => {
            const { getByRole } = render(Login);

            email = getByRole('textbox', { name: 'email' });
            password = getByRole('textbox', { name: 'password' });
            button = getByRole('button', { name: 'Login' });

            userEvent.type(email, emailValue);
            userEvent.type(password, passwordValue);
        });

        test('it calls login', () => {
            userEvent.click(button);

            expect(login).toBeCalledWith({
                email: emailValue,
                password: passwordValue,
            });
        });

        test('it shows error on authentication error', async () => {
            mockLogin.mockRejectedValue(new AuthenticationError('Invalid credentials.'));

            userEvent.click(button);

            expect(await screen.findByText('Invalid credentials.')).toBeVisible();
        });

        test('it logs in on success', async () => {
            const accessToken = 'access_token';
            const refreshToken = 'refresh_token';

            const result = Promise.resolve({ access_token: 'access_token', refresh_token: 'refresh_token' });
            mockLogin.mockReturnValue(result);

            userEvent.click(button);

            await result;

            expect(get(getAccessToken)).toEqual(accessToken);
            expect(get(getRefreshToken)).toEqual(refreshToken);
            expect(get(getIsLoggedIn)).toEqual(true);
        });
    });
});

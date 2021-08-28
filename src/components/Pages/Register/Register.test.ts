import { ByRoleMatcher, ByRoleOptions, render, screen } from '@testing-library/svelte';
import Register from './Register.svelte';
import { register, login, LoginResponse } from '../../../api/auth';
import userEvent from '@testing-library/user-event';
import { tick } from 'svelte';
import { get } from 'svelte/store';
import { getAccessToken, getIsLoggedIn, getRefreshToken } from '../../../stores/auth';

jest.mock('../../../api/auth');
const mockRegister = register as jest.MockedFunction<typeof register>;
const mockLogin = login as jest.MockedFunction<typeof login>;

const formElementsWithRoles = {
    'E-Mail': 'textbox',
    Password: 'textbox',
    'Confirm Password': 'textbox',
    'Display name': 'textbox',
    Register: 'button',
};

const fieldNames = Object.keys(formElementsWithRoles) as FieldNames[];
type FieldNames = keyof typeof formElementsWithRoles;

function extractFields(
    getByRole: (
        text: ByRoleMatcher,
        options?: ByRoleOptions | undefined,
        waitForElementOptions?: unknown
    ) => HTMLElement
): { [K in FieldNames]: HTMLElement } {
    const result: { [K in FieldNames]?: HTMLElement } = {};
    for (const fieldName of fieldNames) {
        result[fieldName] = getByRole(formElementsWithRoles[fieldName], { name: fieldName });
    }

    return result as { [K in FieldNames]: HTMLElement };
}

describe('Register', () => {
    beforeEach(() => {
        mockRegister.mockReset();
        mockLogin.mockReset();
    });

    test('it renders', () => {
        const { getByRole } = render(Register);

        for (const field of Object.values(extractFields(getByRole))) {
            expect(field).toBeVisible();
        }
    });

    test('it errors if password do not match', async () => {
        const { getByRole, getByText } = render(Register);

        const { Password: password, 'Confirm Password': passwordConfirm, Register: button } = extractFields(getByRole);

        userEvent.type(password, 'password1');
        userEvent.type(passwordConfirm, 'password2');
        userEvent.click(button);

        await tick();

        expect(getByText('Passwords do not match')).toBeVisible();
        expect(register).toBeCalledTimes(0);
    });

    describe('with api', () => {
        let elements: { [K in FieldNames]: HTMLElement };

        beforeEach(() => {
            const { getByRole } = render(Register);

            elements = extractFields(getByRole);

            userEvent.type(elements['Display name'], ':name:');
            userEvent.type(elements.Password, ':password:');
            userEvent.type(elements['Confirm Password'], ':password:');
            userEvent.type(elements['E-Mail'], ':email:');
        });

        test('it calls register api', async () => {
            const { Register: button } = elements;

            const registerPromise = Promise.resolve();
            mockRegister.mockReturnValue(registerPromise);

            userEvent.click(button);

            await registerPromise;

            expect(register).toBeCalledWith({
                name: ':name:',
                password: ':password:',
                email: ':email:',
            });
        });

        test('it calls login api after register api', async () => {
            const { Register: button } = elements;

            const registerPromise = Promise.resolve();
            mockRegister.mockReturnValue(registerPromise);

            const loginPromise = Promise.resolve({
                access_token: ':access:',
                refresh_token: ':refresh',
            } as LoginResponse);
            mockLogin.mockReturnValue(loginPromise);

            userEvent.click(button);

            await registerPromise;
            await loginPromise;

            expect(login).toBeCalledWith({
                email: ':email:',
                password: ':password:',
            });
        });

        test('set tokens after login', async () => {
            const accessToken = ':access:';
            const refreshToken = ':refresh:';
            const { Register: button } = elements;

            const registerPromise = Promise.resolve();
            mockRegister.mockReturnValue(registerPromise);

            const loginPromise = Promise.resolve({
                access_token: accessToken,
                refresh_token: refreshToken,
            } as LoginResponse);
            mockLogin.mockReturnValue(loginPromise);

            userEvent.click(button);

            await registerPromise;
            await loginPromise;

            expect(get(getAccessToken)).toEqual(accessToken);
            expect(get(getRefreshToken)).toEqual(refreshToken);
            expect(get(getIsLoggedIn)).toEqual(true);
        });

        test('it shows error on error during register', async () => {
            const { Register: button } = elements;

            mockRegister.mockRejectedValue(new Error(':error:'));

            userEvent.click(button);

            expect(await screen.findByText(':error:')).toBeVisible();
            expect(login).toBeCalledTimes(0);
        });

        test('it shows error on error during login', async () => {
            const { Register: button } = elements;

            mockLogin.mockRejectedValue(new Error(':error:'));

            userEvent.click(button);

            expect(await screen.findByText(':error:')).toBeVisible();
        });
    });
});

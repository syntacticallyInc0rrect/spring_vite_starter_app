import LoginPage from '../LoginPage';
import * as UserApi from "../userApi";
import {loginWithCredentials, registerWithCredentials} from "../userApi";
import {render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import userEvent from "@testing-library/user-event";

describe('LoginPage', () => {
    vi.spyOn(UserApi, 'loginWithCredentials').mockImplementation((credentials) => Promise.resolve({
        status: 200,
        data: {username: credentials.username}
    }));
    vi.spyOn(UserApi, 'registerWithCredentials').mockImplementation((credentials) => Promise.resolve({
        status: 200,
        data: {username: credentials.username}
    }));

    const renderLoginPage = () => render(
        <LoginPage
            setCurrentUser={(_user) => {
            }}
        />
    );

    it('allows a user to login', async () => {
        renderLoginPage();

        const loginPage = await screen.findByTestId('login-page');
        expect(loginPage).toHaveTextContent('Welcome!');
        expect(loginPage).toHaveTextContent('WARNING: password is transferred and stored as plain text.');
        expect(loginPage).toHaveTextContent('DO NOT use a sensitive password!');

        await userEvent.type(screen.getByLabelText('Username:'), 'johndoe');
        await userEvent.type(screen.getByLabelText('Password:'), 'cmplxpswd');
        await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

        await waitFor(() => expect(loginWithCredentials).toHaveBeenCalledTimes(1));

        expect(loginWithCredentials).toHaveBeenCalledWith({username: 'johndoe', password: 'cmplxpswd'});
    });

    it('allows a user to register', async () => {
        renderLoginPage();

        await userEvent.type(screen.getByLabelText('Username:'), 'janedoe');
        await userEvent.type(screen.getByLabelText('Password:'), 'passwordispassword');
        await userEvent.click(screen.getByRole('button', {name: 'Create an Account'}));

        await waitFor(() => expect(registerWithCredentials).toHaveBeenCalledTimes(1));
        expect(registerWithCredentials).toHaveBeenCalledWith({username: 'janedoe', password: 'passwordispassword'});
    });

    it('handles when a user is not found', async () => {
        vi.spyOn(UserApi, 'loginWithCredentials').mockImplementation((credentials) =>
            Promise.reject({status: 404}));

        renderLoginPage();

        const loginPage = screen.getByTestId('login-page');
        expect(loginPage).not.toHaveTextContent('I\'m sorry, the credentials provided did not match our records...');
        expect(loginPage).not.toHaveTextContent('Ensure your credentials are correct and try again');

        await userEvent.type(await screen.findByLabelText('Username:'), 'johndoe');
        await userEvent.type(screen.getByLabelText('Password:'), 'cmplxpswd');
        await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

        const updatedLoginPage = screen.getByTestId('login-page');

        expect(updatedLoginPage).toHaveTextContent('I\'m sorry, the credentials provided did not match our records...');
        expect(updatedLoginPage).toHaveTextContent('Ensure your credentials are correct and try again');
    });


    it('handles when a new username is unavailable', async () => {
        vi.spyOn(UserApi, 'registerWithCredentials').mockImplementation((credentials) =>
            Promise.reject({status: 404}));

        renderLoginPage();

        const loginPage = screen.getByTestId('login-page');
        expect(loginPage).not.toHaveTextContent('I\'m sorry, that username is already taken.');
        expect(loginPage).not.toHaveTextContent(
            'Please click the sign in button if you meant to sign in or try a new username if you meant to register.'
        );

        await userEvent.type(await screen.findByLabelText('Username:'), 'willIam');
        await userEvent.type(screen.getByLabelText('Password:'), 'blackIpeas');
        await userEvent.click(screen.getByRole('button', {name: 'Create an Account'}));

        const updatedLoginPage = screen.getByTestId('login-page');

        expect(updatedLoginPage).toHaveTextContent('I\'m sorry, that username is already taken.');
        expect(updatedLoginPage).toHaveTextContent(
            'Please click the sign in button if you meant to sign in or try a new username if you meant to register.'
        );
    });

});
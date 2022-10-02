import LoginPage from '../LoginPage';
import * as UserApi from "../userApi";
import {render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import {loginWithCredentials, registerWithCredentials} from "../userApi";

describe('LoginPage', () => {
    vi.spyOn(UserApi, 'loginWithCredentials').mockImplementation((credentials) => Promise.resolve({
        status: 200,
        data: {username: credentials.username}
    }));
    vi.spyOn(UserApi, 'registerWithCredentials').mockImplementation((credentials) => Promise.resolve({
        status: 200,
        data: {username: credentials.username}
    }));

    const renderLoginPage = (trueOrFalse = false) => render(
        <LoginPage
            setCurrentUser={(_user) => {}}
            failedLoginAttempt={trueOrFalse}
            setFailedLoginAttempt={(_trueOrFalse) => {}}
        />
    );

    it('allows a user to login', async () => {
        renderLoginPage();

        const loginPage = screen.getByTestId('login-page');
        expect(loginPage).toHaveTextContent('My Application');
        expect(loginPage).toHaveTextContent('Create an Account');
        expect(loginPage).toHaveTextContent('Sign in');
        expect(loginPage).not.toHaveTextContent('Error fetching user with the credentials provided...')
        expect(loginPage).not.toHaveTextContent('Ensure your credentials are correct and try again')
        await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));
        await userEvent.type(await screen.findByLabelText('Username:'), 'johndoe');
        await userEvent.type(screen.getByLabelText('Password:'), 'cmplxpswd');
        await userEvent.click(screen.getByRole('button', {name: 'SUBMIT'}));

        await waitFor(() => expect(screen.queryByLabelText('Username:')).toBeNull())

        expect(loginWithCredentials).toHaveBeenCalledTimes(1);
        expect(loginWithCredentials).toHaveBeenCalledWith({username: 'johndoe', password: 'cmplxpswd'});
    });

    it('allows a user to register', async () => {
        renderLoginPage();

        await userEvent.click(screen.getByRole('button', {name: 'Create an Account'}));
        expect(await screen.findByText('warning: password is transferred and stored as plain text. DO NOT use a sensitive password!')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Username:'), 'janedoe');
        await userEvent.type(screen.getByLabelText('Password:'), 'passwordispassword');
        await userEvent.click(screen.getByRole('button', {name: 'SUBMIT'}));

        await waitFor(() => expect(screen.queryByLabelText('Username:')).toBeNull())

        expect(registerWithCredentials).toHaveBeenCalledTimes(1);
        expect(registerWithCredentials).toHaveBeenCalledWith({username: 'janedoe', password: 'passwordispassword'});
    });

    it('handles when a user is not found', async () => {
        renderLoginPage(true);

        const loginPage = screen.getByTestId('login-page');
        expect(loginPage).toHaveTextContent('Error fetching user with the credentials provided...');
        expect(loginPage).toHaveTextContent('Ensure your credentials are correct and try again');
    });

});
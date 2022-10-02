import App from '../App';
import {render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import * as UserApi from "../userApi";
import {loginWithCredentials} from "../userApi";
import userEvent from "@testing-library/user-event";

describe('App', () => {
    it('displays user login page', async () => {
        render(<App/>);
        expect(await screen.findByRole('button', {name: 'Create an Account'})).toBeInTheDocument();
        expect(await screen.findByRole('button', {name: 'Sign in'})).toBeInTheDocument();
    });

    it('allows user to logout', async () => {
        vi.spyOn(UserApi, 'loginWithCredentials').mockImplementation((credentials) =>
            Promise.resolve({username: credentials.username}));

        render(<App/>);

        expect(screen.queryByRole('button', {name: 'SIGN OUT'})).toBeNull();

        await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));
        await userEvent.type(await screen.findByLabelText('Username:'), 'johndoe');
        await userEvent.type(screen.getByLabelText('Password:'), 'cmplxpswd');
        await userEvent.click(screen.getByRole('button', {name: 'SUBMIT'}));

        await waitFor(() => expect(loginWithCredentials).toHaveBeenCalledWith({username: 'johndoe', password: 'cmplxpswd'}));

        expect(screen.getByText('Hello johndoe!')).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Sign in'})).toBeNull();
        expect(screen.queryByRole('button', {name: 'Create an Account'})).toBeNull();

        await userEvent.click(screen.getByRole('button', {name: 'SIGN OUT'}));

        await waitFor(() => {
            expect(screen.queryByRole('button', {name: 'SIGN OUT'})).toBeNull();
        });
        expect(screen.queryByText('Hello johndoe!')).toBeNull();
        expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Create an Account'})).toBeInTheDocument();
    });

});

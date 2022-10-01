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

    it('displays current user after successful login', async () => {
        vi.spyOn(UserApi, 'loginWithCredentials').mockImplementation((credentials) => Promise.resolve({
            status: 200,
            data: {username: credentials.username}
        }));
        render(<App/>);

        await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));
        await userEvent.type(await screen.findByLabelText('Username:'), 'johndoe');
        await userEvent.type(screen.getByLabelText('Password:'), 'cmplxpswd');
        await userEvent.click(screen.getByRole('button', {name: 'SUBMIT'}));

        waitFor(() => expect(loginWithCredentials).toHaveBeenCalledWith({username: 'johndoe', password: 'cmplxpswd'}));

        expect(screen.getByText('Hello johndoe!')).toBeInTheDocument();
    });

});

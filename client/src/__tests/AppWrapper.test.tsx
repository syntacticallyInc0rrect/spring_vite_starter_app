import AppWrapper from '../AppWrapper';
import {render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import * as UserApi from "../userApi";
import {loginWithCredentials, UserScoreboard} from "../userApi";
import userEvent from "@testing-library/user-event";

describe('AppWrapper', () => {
    const userScoreboard: UserScoreboard = {
        username: 'someone',
        totalGamesFinished: 15,
        totalGamesAbandoned: 10,
        bestTime: 42,
        averageTime: 71,
    };

    vi.spyOn(UserApi, 'loginWithCredentials').mockImplementation((credentials) =>
        Promise.resolve({username: credentials.username}));
    vi.spyOn(UserApi, 'getUserScoreboard').mockImplementation((user) =>
        Promise.resolve(userScoreboard));

    beforeEach(() => localStorage.clear());

   it('allows signed in user to toggle between play and scoreboard pages', async () => {
       render(<AppWrapper />)

       expect(screen.queryByText('Play')).toBeNull();
       expect(screen.queryByText('Scoreboard')).toBeNull();

       await userEvent.type(await screen.findByLabelText('Username:'), 'johndoe');
       await userEvent.type(screen.getByLabelText('Password:'), 'cmplxpswd');

       expect(screen.queryByText('Welcome, johndoe')).toBeNull();

       await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

       await waitFor(() => expect(loginWithCredentials).toHaveBeenCalledWith({
           username: 'johndoe',
           password: 'cmplxpswd'
       }));

       expect(screen.getByText('Welcome, johndoe')).toBeInTheDocument();
       expect(screen.queryByRole('button', {name: 'Sign in'})).toBeNull();
       expect(screen.queryByRole('button', {name: 'Create an Account'})).toBeNull();

       expect(screen.queryAllByText('Play')).toHaveLength(2);
       expect(screen.queryAllByText('Scoreboard')).toHaveLength(1);

       await userEvent.click(screen.getByRole('button', {name: 'Scoreboard'}));

       expect(screen.queryAllByText('Play')).toHaveLength(1);
       expect(screen.queryAllByText('Scoreboard')).toHaveLength(2);

       await userEvent.click(screen.getByRole('button', {name: 'Play'}));

       expect(screen.queryAllByText('Play')).toHaveLength(2);
       expect(screen.queryAllByText('Scoreboard')).toHaveLength(1);
   });

    it('allows signed in user to sign out', async () => {
        render(<AppWrapper />)

        await userEvent.type(await screen.findByLabelText('Username:'), 'johndoe');
        await userEvent.type(screen.getByLabelText('Password:'), 'cmplxpswd');

        expect(screen.queryByText('Welcome, johndoe')).toBeNull();
        expect(screen.queryByRole('button', {name: 'Sign Out'})).toBeNull();

        await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

        await waitFor(() => expect(loginWithCredentials).toHaveBeenCalledWith({
            username: 'johndoe',
            password: 'cmplxpswd'
        }));

        expect(screen.getByText('Welcome, johndoe')).toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', {name: 'Sign Out'}));

        expect(screen.queryByText('Welcome, johndoe')).toBeNull();
        expect(screen.queryByRole('button', {name: 'Sign Out'})).toBeNull();
        expect(await screen.findByRole('button', {name: 'Create an Account'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();
    });
});
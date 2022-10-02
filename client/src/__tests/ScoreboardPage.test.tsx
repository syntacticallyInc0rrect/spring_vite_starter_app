import {ScoreboardPage} from '../ScoreboardPage';
import {render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import * as UserApi from '../userApi';
import {User, UserScoreboard} from "../userApi";

describe('ScoreboardPage', () => {
    const testUser: User = {username: 'RonBurgundy'};

    it('displays user scoreboard statistic once they load from server', async () => {
        const testUserStats: UserScoreboard = {
            username: testUser.username,
            totalGamesFinished: 20,
            totalGamesAbandoned: 10,
            bestTime: 45,
            averageTime: 72,
        }

        vi.spyOn(UserApi, 'getUserScoreboard').mockImplementation((_user) => Promise.resolve(testUserStats));

        render(<ScoreboardPage currentUser={testUser}/>);

        expect(screen.getByTestId('scoreboard-loading-page')).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId('scoreboard-loading-page')).toBeNull());

        const scoreboardPage = screen.getByTestId('scoreboard-page');
        expect(scoreboardPage).toHaveTextContent(`Total Games Played: ${testUserStats.totalGamesFinished}`);
        expect(scoreboardPage).toHaveTextContent(`Total Games Abandoned: ${testUserStats.totalGamesAbandoned}`);
        expect(scoreboardPage).toHaveTextContent('Percentage of Games Completed: 67%');
        expect(scoreboardPage).toHaveTextContent(`${testUserStats.username}'s Best Time: ${testUserStats.bestTime}`);
        expect(scoreboardPage).toHaveTextContent(`${testUserStats.username}'s Average Time: ${testUserStats.averageTime}`);
    });

    it('displays error state when server returns an error instead of a user scoreboard', async () => {
        vi.spyOn(UserApi, 'getUserScoreboard').mockImplementation((_user) => Promise.reject({status: 500}));

        render(<ScoreboardPage currentUser={testUser}/>);

        expect(screen.getByTestId('scoreboard-loading-page')).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId('scoreboard-loading-page')).toBeNull());

        expect(screen.getByTestId('scoreboard-error-page')).toBeInTheDocument();
    })
});

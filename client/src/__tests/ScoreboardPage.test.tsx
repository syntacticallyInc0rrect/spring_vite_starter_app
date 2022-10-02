import {ScoreboardPage} from '../ScoreboardPage';
import {render, screen, waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import * as UserApi from '../userApi';
import {User, UserScoreboard} from "../userApi";

describe('ScoreboardPage', () => {
    const testUser: User = {username: 'RonBurgundy'};

    const testUserStats: UserScoreboard = {
        username: testUser.username,
        totalGamesFinished: 20,
        totalGamesAbandoned: 10,
        bestTime: 45,
        averageTime: 55,
    };

    it('displays user scoreboard statistic once they load from server', async () => {
        vi.spyOn(UserApi, 'getUserScoreboard').mockImplementation((_user) => Promise.resolve(testUserStats));

        render(<ScoreboardPage currentUser={testUser}/>);

        expect(screen.getByTestId('scoreboard-loading-page')).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId('scoreboard-loading-page')).toBeNull());

        const scoreboardPage = screen.getByTestId('scoreboard-page');
        expect(scoreboardPage).toHaveTextContent('Total # of Games Started');
        expect(scoreboardPage).toHaveTextContent((testUserStats.totalGamesFinished + testUserStats.totalGamesAbandoned).toString());
        expect(scoreboardPage).toHaveTextContent('Total # of Games Completed');
        expect(scoreboardPage).toHaveTextContent(testUserStats.totalGamesFinished.toString());
        expect(scoreboardPage).toHaveTextContent('Total # of Games Abandoned');
        expect(scoreboardPage).toHaveTextContent(testUserStats.totalGamesAbandoned.toString());
        expect(scoreboardPage).toHaveTextContent('Percentage of Games Completed');
        expect(scoreboardPage).toHaveTextContent('67%');
        expect(scoreboardPage).toHaveTextContent('Best Time');
        expect(scoreboardPage).toHaveTextContent(`${testUserStats.bestTime}s`);
        expect(scoreboardPage).toHaveTextContent('Average Time');
        expect(scoreboardPage).toHaveTextContent(`${testUserStats.averageTime}s`);
    });

    it('displays times in minutes when greater than 59s', async () => {
        vi.spyOn(UserApi, 'getUserScoreboard').mockImplementation((_user) => Promise.resolve({
            ...testUserStats,
            bestTime: 60,
            averageTime: 60 * 60 - 1,
        }));

        render(<ScoreboardPage currentUser={testUser}/>);

        await waitFor(() => expect(screen.queryByTestId('scoreboard-loading-page')).toBeNull());

        const scoreboardPage = screen.getByTestId('scoreboard-page');

        expect(scoreboardPage).toHaveTextContent('Best Time');
        expect(scoreboardPage).toHaveTextContent('1m 0s');
        expect(scoreboardPage).toHaveTextContent('Average Time');
        expect(scoreboardPage).toHaveTextContent('59m 59s');
    });

    it('displays times in hours when greater than 59m 59s', async () => {
        vi.spyOn(UserApi, 'getUserScoreboard').mockImplementation((_user) => Promise.resolve({
            ...testUserStats,
            bestTime: 60 * 60,
            averageTime: 60 * 60 * 24 - 1,
        }));

        render(<ScoreboardPage currentUser={testUser}/>);

        await waitFor(() => expect(screen.queryByTestId('scoreboard-loading-page')).toBeNull());

        const scoreboardPage = screen.getByTestId('scoreboard-page');

        expect(scoreboardPage).toHaveTextContent('Best Time');
        expect(scoreboardPage).toHaveTextContent('1h 0m 0s');
        expect(scoreboardPage).toHaveTextContent('Average Time');
        expect(scoreboardPage).toHaveTextContent('23h 59m 59s');
    });

    it('displays error state when server returns an error instead of a user scoreboard', async () => {
        vi.spyOn(UserApi, 'getUserScoreboard').mockImplementation((_user) => Promise.reject({status: 500}));

        render(<ScoreboardPage currentUser={testUser}/>);

        expect(screen.getByTestId('scoreboard-loading-page')).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId('scoreboard-loading-page')).toBeNull());

        expect(screen.getByTestId('scoreboard-error-page')).toBeInTheDocument();
    })
});

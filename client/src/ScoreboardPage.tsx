import {useEffect, useState} from "react";
import {getUserScoreboard, UserScoreboard} from "./userApi";
import {PageProps} from "./BodyElement";

export const ScoreboardPage = ({currentUser}: PageProps) => {
    const [userScoreboard, setUserScoreboard] =
        useState<UserScoreboard | 'isInLoadingState' | 'isInErrorState'>('isInLoadingState');

    useEffect(() => {
        getUserScoreboard(currentUser)
            .then(setUserScoreboard)
            .catch(() => setUserScoreboard('isInErrorState'));
    }, [currentUser]);


    if (userScoreboard === 'isInLoadingState') return <div data-testid='scoreboard-loading-page'></div>;
    if (userScoreboard === 'isInErrorState') return <div data-testid='scoreboard-error-page'></div>;

    const getPercentageOfGamesComplete = () => {
        const totalGamesStarted = userScoreboard.totalGamesFinished + userScoreboard.totalGamesAbandoned;
        const gamesFinished = userScoreboard.totalGamesFinished;
        return Math.ceil(gamesFinished / totalGamesStarted * 100);
    };

    const displayTimeInHourMinuteSecondFormat = (num: number): string => {
        if (num < 60) return `${num}s`;
        if (num < 60 * 60) {
            const min = Math.floor(num / 60);
            const sec = num - (min * 60);
            return `${min}m ${sec}s`;
        }
        if (num < 60 * 60 * 24) {
            const hr = Math.floor(num / 60 / 60);
            const min = Math.floor((num - (hr * 60 * 60)) / 60);
            const sec = num - ((hr * 60 * 60) + (min * 60));
            return `${hr}h ${min}m ${sec}s`
        } else {
            return '> 24 hours'
        }
    };

    return (
            <div
                className="overflow-hidden bg-white shadow rounded-lg m-16 lg:m-32"
                data-testid='scoreboard-page'
            >
                <div className="min-h-full overflow-hidden p-2 bg-indigo-600">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-bold font-medium leading-6 text-gray-900">Username</h3>
                    <p className="mt-1 max-w-2xl text-md text-white">{userScoreboard.username}</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Total # of Games Started</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userScoreboard.totalGamesFinished + userScoreboard.totalGamesAbandoned}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Total # of Games Completed</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userScoreboard.totalGamesFinished}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Total # of Games Abandoned</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userScoreboard.totalGamesAbandoned}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Percentage of Games Completed</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{getPercentageOfGamesComplete()}%</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Best Time</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{displayTimeInHourMinuteSecondFormat(userScoreboard.bestTime)}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Average Time</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{displayTimeInHourMinuteSecondFormat(userScoreboard.averageTime)}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

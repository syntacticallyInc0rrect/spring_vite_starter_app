import httpClient from "./httpClient";

export type User = {
    username: string;
};

export type UserCredentials = {
    username: string;
    password: string;
};


export type UserScoreboard = {
    username: string;
    totalGamesFinished: number;
    totalGamesAbandoned: number;
    bestTime: number;
    averageTime: number;
}

export const loginWithCredentials = (credentials: UserCredentials) =>
    httpClient.get(`/api/user/${credentials.password}/${credentials.username}/login`);
export const registerWithCredentials = (credentials: UserCredentials) =>
    httpClient.post(`/api/user`, credentials);

export const getUserScoreboard = (user: User) =>
    httpClient.get(`/api/user/${user.username}/scoreboard`);

export const saveUserStartTime = (user: User, currentTime: Date) => httpClient.post('/api/user/start', {username: user.username, currentTime: currentTime});

export const saveUserFinishTime = (user: User, currentTime: Date) => httpClient.post('/api/user/finish', {username: user.username, currentTime: currentTime});
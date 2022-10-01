import httpClient from "./httpClient";

export type User = {
    username: string;
};

export type UserCredentials = {
    username: string;
    password: string;
};

export const loginWithCredentials = (credentials: UserCredentials) => httpClient.get(`/api/user/login/?username=${credentials.username}&password=${credentials.password}`);

export const registerWithCredentials = (credentials: UserCredentials) => httpClient.get(`/api/user/register/?username=${credentials.username}&password=${credentials.password}`);

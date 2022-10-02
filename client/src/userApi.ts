import httpClient from "./httpClient";

export type User = {
    username: string;
};

export type UserCredentials = {
    username: string;
    password: string;
};

export const loginWithCredentials = (credentials: UserCredentials) =>
    httpClient.get(`/api/user/${credentials.password}/${credentials.username}/login`);

export const registerWithCredentials = (credentials: UserCredentials) =>
    httpClient.get(`/api/user/${credentials.password}/${credentials.username}/register`);

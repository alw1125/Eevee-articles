import { PUBLIC_API_BASE_URL } from "$env/static/public";

export const BASE_URL = PUBLIC_API_BASE_URL;

export const USER_URL = `${BASE_URL}/users/me`;
export const AUTH_URL = `${BASE_URL}/auth`;
export const ART_URL = `${BASE_URL}/articles`;

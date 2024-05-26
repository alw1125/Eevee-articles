import { PUBLIC_API_BASE_URL } from "$env/static/public";

export const BASE_URL = PUBLIC_API_BASE_URL;

export const USER_URL = `${BASE_URL}/users/me`;
export const NEWUSER_URL = `${BASE_URL}/users`;
export const AUTH_URL = `${BASE_URL}/auth`;
export const ART_URL = `${BASE_URL}/articles`;
export const UPLOAD_URL =`${BASE_URL}/upload`;
export const COMMENTS_URL = `${BASE_URL}/comments`;
export const LIKES_URL = `${ART_URL}/:article_id/like`

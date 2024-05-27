import { USER_URL, ART_URL } from "$lib/js/api-urls.js";

export async function load({ fetch, params }) {
    const articleResponse = await fetch(`${ART_URL}`);
    const currentArticle = await articleResponse.json();

    const authorResponse = await fetch(`${USER_URL}`);
    const author = await authorResponse.json();

    return { currentArticle, author };
}

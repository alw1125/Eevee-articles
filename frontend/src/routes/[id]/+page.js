import { ART_URL } from "$lib/js/api-urls.js";

export async function load({ fetch, params }) {

    const articleResponse = await fetch(`${ART_URL}/${params.id}`);
    const article = await articleResponse.json();
    console.log();
    return article;
}

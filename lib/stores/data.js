import { writable } from 'svelte/store';

export const loading = writable(true);
export const pages = writable([]);
export const posts = writable([]);

export const fetchData = async (site) => {
    loading.set(true);
    const baseUrl = 'https://develop-rest.fireofgodmovementinternational.com';
    const pagesSub = await fetch(`${baseUrl}/pages`).then(response => response.json()).then(response => response.filter(i => i.website === site));
    const postsSub = await fetch(`${baseUrl}/posts`).then(response => response.json()).then(response => response.filter(i => i.website === site));
    pages.set(pagesSub);
    posts.set(postsSub);
    loading.set(false);
}
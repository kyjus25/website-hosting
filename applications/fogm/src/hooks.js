export function getSession(event) {
	return event.locals;
}

export async function handle({ event, resolve }) {
	const baseUrl = 'https://develop-rest.fireofgodmovementinternational.com';
	const site = "fogm";

    const [pages, posts, menu] = await Promise.all([
        fetch(`${baseUrl}/pages`).then(response => response.json()).then(response => response.filter(i => i.website === site)),
        fetch(`${baseUrl}/posts`).then(response => response.json()).then(response => response.filter(i => i.website === site)),
        fetch(`${baseUrl}/menus`).then(response => response.json()).then(response => response.find(i => i.website === site))  
    ]);

	pages.map(i => {
		i.slug = i.title.toLowerCase().replace(new RegExp(" ", "g"), "-");
		return i;
	});

	event.locals = {pages, posts, menu};

	const response = await resolve(event);
	return response;
}
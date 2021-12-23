import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			server: {
				fs: {
					allow: ['components']
				}
			}
		},
		files: {
			assets: '../../static',
			lib: '../../lib',
			routes: 'routes',
			template: 'app.html'
		}
	}
};

export default config;

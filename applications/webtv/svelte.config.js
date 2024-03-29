import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			enabled: false
		},
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

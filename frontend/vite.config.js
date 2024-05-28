import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/images': {
				target: 'http://localhost:3000/images',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/images/, '')
			}
		}
	}
});

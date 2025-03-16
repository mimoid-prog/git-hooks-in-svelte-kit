/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
	'**/*.{ts,js,svelte}': ['eslint --fix', 'prettier --write']
};

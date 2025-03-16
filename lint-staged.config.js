/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
	'**/*.{ts,js,svelte,html}': ['eslint --fix', 'prettier --write']
};

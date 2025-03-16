import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

/** typescript-eslint enables ESLint to run on TypeScript code. Also adds new rules specific to TS. */
export default ts.config(
	/** Ignores files from .gitignore from being linted. May not be needed when lint-staged used. */
	includeIgnoreFile(gitignorePath),
	/** Recommended rules for JS */
	js.configs.recommended,
	/** Recommended rules for TS */
	...ts.configs.recommended,
	/** Recommended rules for Svelte */
	...svelte.configs.recommended,
	/** Disables eslint rules that are unnecessary or might conflict with Prettier. */
	prettier,
	/** Disables Svelte eslint rules that are unnecessary or might conflict with Prettier. */
	...svelte.configs.prettier,
	/** Lists global (like window, document, process, __dirname) for Eslint to know they don't require import */
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	/** Eslint config for Svelte files */
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		ignores: ['eslint.config.js', 'svelte.config.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);

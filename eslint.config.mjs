import eslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*js', '**/*.mjs'],
    ...perfectionist.configs['recommended-alphabetical'],
  },
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  eslintPluginPrettier,
);

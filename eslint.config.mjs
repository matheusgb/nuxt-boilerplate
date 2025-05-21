// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  /** @type {import('eslint').Linter.Config} */
  ({
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  })
);

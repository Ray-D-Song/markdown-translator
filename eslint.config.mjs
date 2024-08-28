// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      // overrides
      'test/no-import-node-test': 'off',
      'test/consistent-test-it': 'off',
    },
  },
)

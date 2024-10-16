import importPlugin from 'eslint-plugin-import';

export default [
  {
    // Add rules or plugins directly instead of using "extends"
    plugins: {
      import: importPlugin
    },
    rules: {
      ...importPlugin.configs.errors.rules,
      ...importPlugin.configs.warnings.rules
    }
  }
];


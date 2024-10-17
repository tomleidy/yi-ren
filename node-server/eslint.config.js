import importPlugin from 'eslint-plugin-import';

export default [
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      ...importPlugin.configs.errors.rules,
      ...importPlugin.configs.warnings.rules
    }
  }
];

// postponing implementation of ESLint. Learning to use ES without Common JS is apparently going to be a process that I want to consider only _after_ implementing MVP.
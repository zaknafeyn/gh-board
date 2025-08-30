import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  documents: 'src/**/*.gql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        declarationKind: 'interface',
        apolloReactHooksImportFrom: '@apollo/client',
        apolloReactCommonImportFrom: '@apollo/client',
      },
    },
  },
};

export default config;

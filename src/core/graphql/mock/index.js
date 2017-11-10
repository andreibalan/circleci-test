import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { buildClientSchema } from 'graphql';

import mocks from './mocks';
import typeDefs from './typeDefs';
import introspectionResults from './json/introspectionResults.json';

// const schema = makeExecutableSchema({ typeDefs });
const schema = buildClientSchema(introspectionResults);

addMockFunctionsToSchema({
  schema,
  mocks,
  preserveResolvers: false,
});

export default schema;

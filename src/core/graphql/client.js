import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionQueryResultData from './json/fragmentTypes.json';

export default function ({ link }) {
  const cache = new InMemoryCache({
    // dataIdFromObject: ({ key }) => key,
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData,
    }),
  });

  // if (window.__APOLLO_STATE__) {
  //   cache.restore(JSON.parse(window.__APOLLO_STATE__));
  // }

  return new ApolloClient({
    link,
    cache,
    ssrMode: false,
    connectToDevTools: true,
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
}

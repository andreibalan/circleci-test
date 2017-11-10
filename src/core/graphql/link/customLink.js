import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';

import AxiosLink from './axiosLink';
import AxiosBatchLink from './axiosBatchLink';

export default function ({
  uri = '/graphql',
  batch = true,
  batchInterval = 10,
  batchMax = 10,
  axiosInstance,
}) {
  const axiosLinkConfiguration = {
    uri,
    axiosInstance,
    includeExtensions: false,
  };

  const axiosLink = batch ?
    new AxiosBatchLink(axiosLinkConfiguration) :
    new AxiosLink({
      ...axiosLinkConfiguration,
      batchInterval,
      batchMax,
    });

  const errorInterceptorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      // console.log('graphQLErrors', graphQLErrors);
    }

    if (networkError) {
      // console.log('networkError', networkError);
    }
  });

  return from([
    errorInterceptorLink,
    axiosLink,
  ]);
}

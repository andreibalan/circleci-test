import { ApolloLink, Observable } from 'apollo-link-core';
import { print } from 'graphql/language/printer';
import axios from 'axios';
import _has from 'lodash/has';

export const operationToData = (operation, includeExtensions = true) => {
  const { operationName, extensions, variables, query } = operation;

  const data = {
    operationName,
    variables,
    query: print(query),
  };

  if (includeExtensions) {
    data.extension = extensions;
  }

  return data;
};

export const checkResponse = (operation) => (response) => {
  if (!_has(response.data, 'data') && !_has(response.data, 'errors')) {
    throw new Error(`Server response was missing for query '${operation.operationName}'.`);
  }

  return response.data;
};

export default class AxiosLink extends ApolloLink {
  constructor({
    uri = '/graphql',
    axiosInstance = axios.create(),
    includeExtensions = true,
  }) {
    super();

    this.uri = uri;
    this.instance = axiosInstance;
    this.cancelTokenSource = axios.CancelToken.source();
    this.includeExtensions = includeExtensions;
  }

  request(operation) {
    const { uri, instance, cancelTokenSource, includeExtensions } = this;
    const { headers } = operation.getContext();

    instance.interceptors.request.use((config) => {
      // eslint-disable-next-line no-param-reassign
      config.headers = { ...config.headers, ...headers };
      return config;
    });

    return new Observable((observer) => {
      instance.request({
        url: uri,
        method: 'POST',
        cancelToken: cancelTokenSource.token,
        data: operationToData(operation, includeExtensions),
      })
        .then((response) => {
          operation.setContext({ response });
          return response;
        })
        .then(checkResponse(operation))
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((e) => {
          if (axios.isCancel(e)) { return; }
          observer.error(e);
        });

      return () => {
        // cancelTokenSource.cancel();
      };
    });
  }
}

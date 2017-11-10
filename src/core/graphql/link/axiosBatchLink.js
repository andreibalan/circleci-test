import { ApolloLink, Observable } from 'apollo-link-core';
import { BatchLink } from 'apollo-link-batch';
import axios from 'axios';
import _map from 'lodash/map';
import _merge from 'lodash/merge';

import { operationToData } from './axiosLink';

export default class AxiosBatchLink extends ApolloLink {
  constructor({
    uri = '/graphql',
    axiosInstance = axios.create(),
    includeExtensions = true,
    batchInterval = 10,
    batchMax = 10,
  }) {
    super();

    this.uri = uri;
    this.instance = axiosInstance;
    this.cancelTokenSource = axios.CancelToken.source();
    this.includeExtensions = includeExtensions;
    this.batchInterval = batchInterval;
    this.batchMax = batchMax;

    this.batcher = new BatchLink({
      batchInterval: this.batchInterval,
      batchMax: this.batchMax,
      batchHandler: (operations) => {
        const headers = _merge(..._map(operations, (operation) => operation.getContext().headers));

        this.instance.interceptors.request.use((config) => {
          // eslint-disable-next-line no-param-reassign
          config.headers = { ...config.headers, ...headers };
          return config;
        });

        return new Observable((observer) => {
          this.instance.request({
            url: uri,
            method: 'POST',
            data: _map(operations, (operation) => operationToData(operation, includeExtensions)),
          })
            .then((response) => {
              observer.next(response.data);
              observer.complete();
            })
            .catch(observer.error.bind(observer));
        });
      },
    });
  }

  request(operation) {
    return this.batcher.request(operation);
  }
}

import { ApolloLink, Observable } from 'apollo-link-core';
import { graphql } from 'graphql';
import { print } from 'graphql/language/printer';

export default class LocalLink extends ApolloLink {
  constructor({
    schema,
    rootValue,
    context,
  }) {
    super();

    this.schema = schema;
    this.rootValue = rootValue;
    this.context = context;
  }

  request(operation) {
    return new Observable((observer) => {
      graphql(
        this.schema,
        print(operation.query),
        this.rootValue,
        this.context,
        operation.variables,
        operation.operationName
      )
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch(observer.error.bind(observer));
    });
  }
}

import React, { Component } from 'react';
import prettyBytes from 'pretty-bytes';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query GetOrganizations {
    organizations {
      name
    }
  }
`;


@graphql(QUERY)
export default class Button extends Component {
  render() {
    console.log('button', this.props.data);

    return (
      <div>{prettyBytes(12345234)}</div>
    );
  }
}

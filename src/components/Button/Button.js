import React, { Component } from 'react';
import prettyBytes from 'pretty-bytes';

export default class Button extends Component {
  render() {
    return (
      <div>{prettyBytes(12345234)}</div>
    );
  }
}

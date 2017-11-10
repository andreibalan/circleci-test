import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import apolloClient from 'core/graphql';

import './index.css';
import App from './App';

// import registerServiceWorker from './registerServiceWorker';

const render = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <AppContainer>
        <Component />
      </AppContainer>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

render(App);
if (module.hot) {
  module.hot.accept('./App', () => render(App));
}

// registerServiceWorker();

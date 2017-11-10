import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Button from 'components/Button';
import Card from 'components/Card';
import Poster from 'components/Poster';

import { cache } from 'core/graphql/client';

import logo from './logo.svg';
import css from './App.css';

const QUERY = gql`
  query GetUsersInfo {
    users {
      pageInfo {
        hasNextPage
      }
    }
  }
`;

@graphql(QUERY, {
  options: {
    //fetchPolicy: 'network-only',
  },
})
class App extends Component {
  static defaultProps = {
    data: null,
  };

  static propTypes = {
    data: PropTypes.object,
  };

  async test() {
    console.info('test');
  }

  componentDidCatch(error, info) {
    console.log('error', e);
  }

  render() {
    console.info('app', this.props);
    return (
      <div className={css.App}>
        <header className={css.AppHeader}>
          <img src={logo} className={css.AppLogo} alt="logo" />
          <h1 className={css.AppTitle}>Welcome to React</h1>
        </header>
        <div className={css.AppIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.

          <br />
          <br />

          <Button />

          <br />
          <br />

          <code>
            {JSON.stringify(process.env, null, 2)}
          </code>

          <br />
          <br />

          <code>
            {JSON.stringify(this.props.data.users || {})}
          </code>

          <br />
          <br />

          <br />
          <br />

          <button
            onClick={() => {
              this.test();
              this.props.data.refetch();

              // console.log(JSON.stringify(cache.extract()));

            }}
          >
            Test
          </button>

          <br/><br/>


          {/*<Card natural />*/}

          <br/>
          <br/>
          <br/>
          <br/>

          <Poster prespectiveAmount={3000} />

          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br /><br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />


        </div>
      </div>
    );
  }
}

export default App;

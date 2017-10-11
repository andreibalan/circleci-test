import React, { Component } from 'react';

import Button from 'components/Button';
import Test from './Test';

import logo from './logo.svg';
import css from './App.css';

@Test
class App extends Component {
  async test() {
    console.info('test');
  };

  render() {
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

          <br />
          <br />

          <br />
          <br />

          <button
            onClick={() => {
              this.test()
            }}
          >
            Test
          </button>
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import * as store from '../store';

window.store = store;

export default class App extends React.Component {
  render () {
    return (
      <div>
        Hi there!!!
      </div>
    );
  }
}

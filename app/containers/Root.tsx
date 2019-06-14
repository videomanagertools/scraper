import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import Routes from '../Routes';

type Props = {
  store: any;
};

export default class Root extends Component<Props> {
  render() {
    const { store } = this.props;
    console.log(store.getState());
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

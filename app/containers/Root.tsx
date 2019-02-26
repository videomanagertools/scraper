import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from '../Routes';
import { History } from 'history';

type Props = {
  store: any;
  history: History<any>;
};

export default class Root extends Component<Props> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

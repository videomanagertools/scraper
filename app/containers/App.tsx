import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Home from './Home';

type Props = {
  store: any;
};
class Root extends Component<Props> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
export default hot(Root);

import { createStore, compose } from 'redux';
import rootReducer from '../reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}
export function configureStore(init?: any) {
  return createStore(
    rootReducer(),
    init,
    compose(
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
}
export default {};

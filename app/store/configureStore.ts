
import { createStore, compose } from 'redux'
import rootReducer from '../reducers';
declare global {
  interface Window { devToolsExtension: any; }
}
export function configureStore(init?: any) {
  return createStore(rootReducer(), init, compose(window.devToolsExtension ? window.devToolsExtension() : f => f))
}
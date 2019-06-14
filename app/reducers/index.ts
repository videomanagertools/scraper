import { combineReducers } from 'redux';
import counter from './counter';
import fileViewer from './fileViewer';


export default function createRootReducer() {
  return combineReducers({
    counter, fileViewer
  });
}

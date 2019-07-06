import { combineReducers } from 'redux';
import fileViewer from './fileViewer';

export default function createRootReducer() {
  return combineReducers({
    fileViewer
  });
}

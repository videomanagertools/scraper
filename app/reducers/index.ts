import { combineReducers } from 'redux';
import file from './file';

export default function createRootReducer() {
  return combineReducers({
    file
  });
}

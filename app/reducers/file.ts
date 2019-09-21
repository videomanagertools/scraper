import { ActionType } from 'typesafe-actions';
import { flatTrees } from '../utils';
import * as fileViewer from '../actions/file';
import {
  CHANGE_SELECTED_KEY,
  CHANGE_CHECKED_KEYS,
  SELECT_FILES,
  SET_SELECTED_FILENAME,
  UPDATE_TREE,
  CHANGE_FAILUREEYS
} from '../constants/file';

export type FileAction = ActionType<typeof fileViewer>;

const defaultState = {
  selectedFilename: '',
  selectedKey: '',
  checkedKeys: [],
  trees: [],
  flatTrees: {},
  failureKeys: []
};
type defaultState = Readonly<{
  selectedFilename: string;
  selectedKey: string;
  checkedKeys: string[];
  trees: Object[];
  flatTrees: Object;
  failureKeys: string[];
}>;

export default (state: defaultState = defaultState, action: FileAction) => {
  switch (action.type) {
    case CHANGE_SELECTED_KEY:
      return {
        ...state,
        selectedKey: action.payload ? action.payload : '',
        selectedFilename: action.payload
          ? state.flatTrees[action.payload].title
          : ''
      };
    case CHANGE_CHECKED_KEYS:
      return { ...state, checkedKeys: action.payload };
    case SELECT_FILES:
      return {
        ...state,
        trees: action.payload,
        flatTrees: flatTrees(action.payload)
      };
    case SET_SELECTED_FILENAME:
      return { ...state, selectedFilename: action.payload };
    case UPDATE_TREE:
      return { ...state, trees: action.payload };
    case CHANGE_FAILUREEYS:
      return {
        ...state,
        failureKeys: action.payload
      };
    default:
      return state;
  }
};

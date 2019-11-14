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
import { FileNode } from '@types';

export type FileAction = ActionType<typeof fileViewer>;

const defaultState = {
  selectedFilename: '',
  selectedKey: '',
  checkedKeys: [],
  tree: {
    title: '',
    key: 'def',
    children: []
  },
  flatTree: {},
  failureKeys: []
};
type defaultState = Readonly<{
  selectedFilename: string;
  selectedKey: string;
  checkedKeys: string[];
  tree: FileNode;
  flatTree: Object;
  failureKeys: string[];
}>;

export default (state: defaultState = defaultState, action: FileAction) => {
  switch (action.type) {
    case CHANGE_SELECTED_KEY:
      return {
        ...state,
        selectedKey: action.payload ? action.payload : '',
        selectedFilename:
          action.payload && !state.flatTree[action.payload].isDir
            ? state.flatTree[action.payload].title
            : ''
      };
    case CHANGE_CHECKED_KEYS:
      return { ...state, checkedKeys: action.payload };
    case SELECT_FILES:
      return {
        ...state,
        tree: action.payload,
        flatTree: flatTrees([action.payload])
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

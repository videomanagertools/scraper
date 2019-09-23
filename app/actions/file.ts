import { action } from 'typesafe-actions';
import {
  CHANGE_SELECTED_KEY,
  CHANGE_CHECKED_KEYS,
  SELECT_FILES,
  SET_SELECTED_FILENAME,
  UPDATE_TREE,
  CHANGE_FAILUREEYS
} from '../constants/file';
import { FileNode } from '@types';

export const changeSelected = (selectedKey: string) =>
  action(CHANGE_SELECTED_KEY, selectedKey);
export const changeChecked = (checkedKeys: string[]) =>
  action(CHANGE_CHECKED_KEYS, checkedKeys);
export const selectFiles = (tree: FileNode) => action(SELECT_FILES, tree);
export const setSelectedFilename = (value: string) =>
  action(SET_SELECTED_FILENAME, value);
export const updateTree = (tree: FileNode) => action(UPDATE_TREE, tree);
export const changeFailureKeys = (keys: string[]) =>
  action(CHANGE_FAILUREEYS, keys);
export default {
  ...changeChecked
};

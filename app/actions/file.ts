import { action } from 'typesafe-actions';
import {
  CHANGE_SELECTED_KEY,
  CHANGE_CHECKED_KEYS,
  SELECT_FILES,
  SET_SELECTED_FILENAME
} from '../constants/file';

export const changeSelected = (selectedKey: string) =>
  action(CHANGE_SELECTED_KEY, selectedKey);
export const changeChecked = (checkedKeys: string[]) =>
  action(CHANGE_CHECKED_KEYS, checkedKeys);
export const selectFiles = (trees: string[]) => action(SELECT_FILES, trees);
export const setSelectedFilename = (value: string) =>
  action(SET_SELECTED_FILENAME, value);


import { FileActionTypes, FileActionTypeKeys } from '../actions/fileViewer';
import { flatTrees } from '../utils';

const defaultState = {
    selectedFilename: '',
    selectedKey: '',
    checkedKeys: [],
    trees: [],
    flatTrees: {}
}
type defaultState = {
    selectedFilename: string,
    selectedKey: string,
    checkedKeys: Object[],
    trees: Object[],
    flatTrees: Object
};

export default (state: defaultState = defaultState, action: FileActionTypes) => {
    switch (action.type) {
        case FileActionTypeKeys.CHANGE_SELECTED_KEY:
            const selectedFilename = state.flatTrees[action.selectedKey].title
            return { ...state, selectedKey: action.selectedKey, selectedFilename }
        case FileActionTypeKeys.CHANGE_CHECKED_KEYS:
            return { ...state, checkedKeys: action.checkedKeys }
        case FileActionTypeKeys.SELECT_FILES:
            return { ...state, trees: action.trees, flatTrees: flatTrees(action.trees) }
        case FileActionTypeKeys.SET_SELECTED_FILENAME:
            return { ...state, selectedFilename: action.value }
        default:
            return state
    }
}
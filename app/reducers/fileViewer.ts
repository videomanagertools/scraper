
import { FileActionTypes, FileActionTypeKeys } from '../actions/fileViewer';
import { flatTrees } from '../utils';

const defaultState = {
    selectedFilename: '',
    checkedKeys: [],
    trees: [],
    flatTrees: {}
}
type defaultState = {
    selectedFilename: string,
    checkedKeys: Object[],
    trees: Object[],
    flatTrees: Object
}

export default (state: defaultState = defaultState, action: FileActionTypes) => {
    switch (action.type) {
        case FileActionTypeKeys.CHANGE_SELECTED_KEYS:
            let selectedFilename = state.flatTrees[action.selectedKey]['title']
            return { ...state, selectedFilename }
        case FileActionTypeKeys.CHANGE_CHECKED_KEYS:
            return { ...state, checkedKeys: action.checkedKeys }
        case FileActionTypeKeys.SELECT_FILES:
            return { ...state, trees: action.trees, flatTrees: flatTrees(action.trees) }
        default:
            return state
    }
}
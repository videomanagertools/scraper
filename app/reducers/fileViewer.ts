
import { FileActionTypes, FileActionTypeKeys } from '../actions/fileViewer';

const defaultState = {
    selectedKeys: [],
    checkedKeys: [],
    trees: []
}
type defaultState = {
    selectedKeys: Object[],
    checkedKeys: Object[],
    trees: Object[]
}
export default (state: defaultState = defaultState, action: FileActionTypes) => {
    switch (action.type) {
        case FileActionTypeKeys.CHANGE_SELECTED_KEYS:
            state.selectedKeys = action.selectedKeys;
            return state
        case FileActionTypeKeys.CHANGE_CHECKED_KEYS:
            state.checkedKeys = action.checkedKeys;
            return state
        case FileActionTypeKeys.SELECT_FILES:
            state.trees = action.trees;
            return state
        default:
            return state
    }
}
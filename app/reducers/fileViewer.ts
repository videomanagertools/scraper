
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
            return { ...state, checkedKeys: action.selectedKeys }
        case FileActionTypeKeys.CHANGE_CHECKED_KEYS:
            return { ...state, checkedKeys: action.checkedKeys }
        case FileActionTypeKeys.SELECT_FILES:
            return { ...state, trees: action.trees }
        default:
            return state
    }
}
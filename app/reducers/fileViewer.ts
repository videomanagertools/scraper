
import { FileActionTypes, FileActionTypeKeys } from '../actions/fileViewer';

const defaultState = {
    selectedKeys: [],
    checkedKeys: []
}
type defaultState = {
    selectedKeys: Object[],
    checkedKeys: Object[]
}
export default (state: defaultState = defaultState, action: FileActionTypes) => {
    switch (action.type) {
        case FileActionTypeKeys.CHANGE_SELECTED_KEYS:
            state.selectedKeys = action.selectedKeys
    }
}
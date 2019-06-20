export enum FileActionTypeKeys {
    CHANGE_SELECTED_KEYS = "CHANGE_SELECTED_KEYS",
    CHANGE_CHECKED_KEYS = 'CHANGE_CHECKED_KEYS',
    SELECT_FILES = 'SELECT_FILES'
}
interface ChangeSelectedAction {
    type: FileActionTypeKeys.CHANGE_SELECTED_KEYS,
    selectedKeys: Object[]
}
interface ChangeCheckedAction {
    type: FileActionTypeKeys.CHANGE_CHECKED_KEYS,
    checkedKeys: Object[]
}
interface SelectFilesAction {
    type: FileActionTypeKeys.SELECT_FILES,
    trees: Object[]
}
export type FileActionTypes = ChangeCheckedAction | ChangeSelectedAction | SelectFilesAction
export function changeSelected(checkedKeys) {
    return {
        type: FileActionTypeKeys.CHANGE_SELECTED_KEYS,
        checkedKeys
    }
}
export function changeChecked(checkedKeys) {
    return {
        type: FileActionTypeKeys.CHANGE_CHECKED_KEYS,
        checkedKeys
    }
}
export function selectFiles(trees) {
    return {
        type: FileActionTypeKeys.SELECT_FILES,
        trees
    }
}
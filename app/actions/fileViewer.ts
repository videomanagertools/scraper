export enum FileActionTypeKeys {
    CHANGE_SELECTED_KEY = "CHANGE_SELECTED_KEY",
    CHANGE_CHECKED_KEYS = 'CHANGE_CHECKED_KEYS',
    SELECT_FILES = 'SELECT_FILES',
    SET_SELECTED_FILENAME = "SET_SELECTED_FILENAME"
}
interface ChangeSelectedAction {
    type: FileActionTypeKeys.CHANGE_SELECTED_KEY,
    selectedKey: string
}
interface ChangeCheckedAction {
    type: FileActionTypeKeys.CHANGE_CHECKED_KEYS,
    checkedKeys: Object[]
}
interface SelectFilesAction {
    type: FileActionTypeKeys.SELECT_FILES,
    trees: Object[]
}
interface SetSelectedFilename {
    type: FileActionTypeKeys.SET_SELECTED_FILENAME,
    value: string
}
export type FileActionTypes = ChangeCheckedAction | ChangeSelectedAction | SelectFilesAction | SetSelectedFilename
export function changeSelected(selectedKey) {
    return {
        type: FileActionTypeKeys.CHANGE_SELECTED_KEY,
        selectedKey
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
export function setSelectedFilename(value) {
    return {
        type: FileActionTypeKeys.SET_SELECTED_FILENAME,
        value
    }
}
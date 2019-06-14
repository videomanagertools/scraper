export enum FileActionTypeKeys {
    CHANGE_SELECTED_KEYS = "CHANGE_SELECTED_KEYS",
    CHANGE_CHECKED_KEYS = 'CHANGE_CHECKED_KEYS'
}
interface ChangeSelectedAction {
    type: FileActionTypeKeys.CHANGE_SELECTED_KEYS,
    selectedKeys: Object[]
}
interface ChangeCheckedAction {
    type: FileActionTypeKeys.CHANGE_CHECKED_KEYS,
    checkedKeys: Object[]
}
export type FileActionTypes = ChangeCheckedAction | ChangeSelectedAction
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
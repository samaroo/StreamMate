export const creationStatusReducer = (state = null, action) => {
    switch (action.type) {
        case 'SUCCESSFUL_CREATION':
            return true
        case 'FAILED_CREATION':
            return false
        case 'CLOSE_BUTTON_PRESSED':
            return null
        default: 
            return state
    }
}
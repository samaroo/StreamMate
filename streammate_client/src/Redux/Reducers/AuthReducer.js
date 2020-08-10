const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {isSignedIn: true, userId: action.payload}
        case 'SIGN_OUT':
            return {isSignedIn: false, userId: null}
        default:
            return state
    }
}
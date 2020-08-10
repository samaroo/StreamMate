export const signIn = (userId) => {
    console.log('ACTION')
    return {
        type: 'SIGN_IN',
        payload: userId
    }
}
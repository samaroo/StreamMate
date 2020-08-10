export const currentPageReducer = (state = '', action) => {
    switch (action.type) {
        case 'LOAD_CREATE_STREAM' :
            return 'CREATE_STREAM'
        case 'LOAD_STREAM_LIST':
            return 'STREAM_LIST'
        case 'LOAD_STREAM_VIEW':
            return 'STREAM_VIEW'
        default:
            return state
    }
}
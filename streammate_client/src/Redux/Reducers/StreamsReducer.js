import _ from 'lodash'

export const streamsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_A_STREAM':
            return {...state, [action.payload.id]: action.payload}
        case 'DELETE_A_STREAM':
            return _.omit(state, action.payload)
        case 'EDIT_A_STREAM':
            return {...state, [action.payload.id]: action.payload}
        case 'FETCH_ALL_STREAMS':
            return _.mapKeys(action.payload, 'id')
        case 'FETCH_A_STREAM':
            return {...state, [action.payload.id]: action.payload}
        default:
            return state
    }
}
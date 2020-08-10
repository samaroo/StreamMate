//exports combined reducers

//import combineReducers fucntion
import {combineReducers} from 'redux'

//import all the reducers
import {authReducer} from './AuthReducer'
import {reducer as formReducer} from 'redux-form'
import {streamsReducer} from './StreamsReducer'
import {currentPageReducer} from './CurrentPageReducer'
import {creationStatusReducer} from './CreationStatusReducer.js'

export const combinedReducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamsReducer,
    currentPage: currentPageReducer,
    creationWasSuccessful: creationStatusReducer
})
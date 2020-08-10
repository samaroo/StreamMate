import React from 'react'
import ReactDOM from 'react-dom'

//redux
import {Provider} from 'react-redux'
import {store} from './Redux/Store'

//import App
import App from './Components/App'

//-------- Testing Area -----------
import {createAStream} from './Redux/ActionCreators/StreamManipulation/CreateAStream'
import {deleteAStream} from './Redux/ActionCreators/StreamManipulation/DeleteAStream'
//store.dispatch(createAStream({
//    Title: 'Test2',
//    Description: 'Test2_Desc'
//}))
//store.dispatch(deleteAStream(1))
//----------------------------------

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
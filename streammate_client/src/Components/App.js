import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

//import stream components
import StreamList from './StreamComponents/StreamList'
import StreamView from './StreamComponents/StreamView'
import StreamCreate from './StreamComponents/StreamCreate'
import StreamDelete from './StreamComponents/StreamDelete'
import StreamEdit from './StreamComponents/StreamEdit'

import Header from './Header'

//import style
import '../Style/App/App.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <main className='ui container'>
                    <Header/>
                    <Route path='/' exact component={StreamList}/>
                    <Route path='/view/:id' exact component={StreamView}/>
                    <Route path='/create' exact component={StreamCreate}/>
                </main>
            </BrowserRouter>
        )
    }
}

export default App
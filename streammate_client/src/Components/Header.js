import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Login from './Login'

//import action creators

//import style
import '../Style/Header/Header.css'


class Header extends Component {
    render() {
        return (
            <div className='ui large secondary inverted pointing menu header' style={{border: 'none'}}>
                <Link class={`item ${this.props.currentPage === 'STREAM_LIST' ? 'active' : ''}`} to='/'>
                    All Streams
                </Link>
                <Link class={`item ${this.props.currentPage === 'CREATE_STREAM' ? 'active' : ''}`} to='/create'>
                    Create A Stream
                </Link>
                <div className='right item buttons'>
                    <Login/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {currentPage: state.currentPage}
}

export default connect(mapStateToProps, null)(Header)

import React, { Component } from 'react'
import {connect} from 'react-redux'

//import action creators
import {signIn} from '../Redux/ActionCreators/SignIn'
import {signOut} from '../Redux/ActionCreators/SignOut'

class Login extends Component {

    componentDidMount() {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: '572041769290-fpmrquu2rkn9n2or4kuh3o0thi67c6oq.apps.googleusercontent.com',
                scope: 'profile email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.handleAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.handleAuthChange)
            })
        })
    }

    componentDidUpdate(){
        console.log(this)
    }

    handleAuthChange = (isSignedIn) => {
        if(isSignedIn){
            const userId = this.auth.currentUser.get().getId()
            this.props.signIn(userId)
        }
        else{
            this.props.signOut()
        }
    }

    signInClick = () => {
        this.auth.signIn()
    }

    signOutClick = () => {
        this.auth.signOut()
    }

    renderButton = () => {
        if (this.props.auth.isSignedIn) {
            return (
                <button className='ui button white inverted' onClick={this.signOutClick}>
                    Log Out
                </button>
            );
        }
        else{
            return (
            <button className='ui button white inverted' onClick={this.signInClick}>
                Log In
            </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {auth: state.auth}
}

export default connect(mapStateToProps, {signIn, signOut})(Login)

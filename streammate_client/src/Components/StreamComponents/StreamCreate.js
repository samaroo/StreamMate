import React, { Component } from 'react'
import {connect} from 'react-redux'

//react-modal
import Modal from 'react-modal'

//redux-form
import {Field, reduxForm} from 'redux-form'

//import action creators
import {createAStream} from '../../Redux/ActionCreators/StreamManipulation/CreateAStream'
import {loadCreateStreamPage} from '../../Redux/ActionCreators/LoadCreateStreamPage'
import {closeButtonPressed} from '../../Redux/ActionCreators/CloseButtonPressed'

//import react-router stuff
import {Link} from 'react-router-dom'

const style = {
    overlay: {
        background: 'rgba(0, 0, 0, 0.85)'
    },
    content: {
        top: '100px',
        left: '100px',
        right: '100px',
        bottom: '100px',
        background: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-around',
        textAlign: 'center'
    }
}

class SreamCreate extends Component {

    componentDidMount() {
        this.props.loadCreateStreamPage()
    }

    renderInput = (formProps) => {
        return (
            <div className='field'>
                <label style={{marginTop: '50px', marginBottom: '20px', fontSize: '1.25em', color: 'white'}}>{formProps.input.name}</label>
                <input 
                    placeholder={`Enter ${formProps.input.name}`} 
                    onChange={formProps.input.onChange} 
                    value={formProps.input.value} 
                    style={{color: 'white', background: 'none', border: 'solid 0.75px white', maxWidth: '500px'}} 
                    autoComplete='off'
                /> 
            </div>
        );
    }

    generateField = (type) => {
        return <Field name={type} type='text' component={this.renderInput} />
    }

    renderForm = () => {
        if(this.props.isSignedIn){
            return (
                <form className='ui form' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    {this.generateField('Title')}
                    {this.generateField('Description')}
                    <button className='ui button white inverted' style={{marginTop: '50px'}}>Submit</button>
                </form>
            )
        }
    }

    renderWarningMessage = () => {
        if(!this.props.isSignedIn){
            return (
                <div className='ui negative message' style={{marginTop: '50px'}}>
                    <i class="close icon" style={{color: 'rgb(125, 0, 35)'}}/>
                    <div class="header">
                        You do not have permission to create a stream!
                    </div>
                    <p style={{color: 'rgb(125, 0, 35)'}}>Please log in to get creation privellages</p>
                </div>
            )
        }
    }

    onSubmit = (formData) => {
        this.props.createAStream(formData)
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderWarningMessage()}
                <Modal isOpen={this.props.creationWasSuccessful} style={style}>
                    <h1 className='ui header' style={{color: 'white'}}>SUCCESSFUL CREATION   :)</h1>
                    <div style={{display: 'grid', placeItems: 'center center'}}>
                        <div>
                            <Link to='/'>
                                <button className='ui inverted button' style={{maxWidth: '300px', marginBottom: '50px', margin: '25px'}} onClick={this.props.closeButtonPressed}>View Streams</button>
                            </Link>
                            <button className='ui inverted button' style={{maxWidth: '300px', marginBottom: '50px', margin: '25px'}} onClick={this.props.closeButtonPressed}>Close Message</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

//Defines errors in forms
const validate = (formData) => {
    const error = {}

    if(!formData.Title){
        error.Title = 'Title is required'
    }
    if(!formData.Description){
        error.Description = 'Description is required'
    }

    return error
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn, creationWasSuccessful: state.creationWasSuccessful}
}

const formWrappedStreamCreate = reduxForm({form: 'createStream', validate})(SreamCreate)

export default connect(mapStateToProps, {createAStream, loadCreateStreamPage, closeButtonPressed})(formWrappedStreamCreate)

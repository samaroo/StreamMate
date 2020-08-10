import React, { Component } from 'react'

//redux-form
import {Field, reduxForm} from 'redux-form'

//redux
import {connect} from 'react-redux'

//action creators
import {editAStream} from '../../Redux/ActionCreators/StreamManipulation/EditAStream'

class StreamEdit extends Component {

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

    onSubmit = (formData) => {
        this.props.editAStream(this.props.streamId, formData, this.props.userId);
        this.props.callBack();
    }

    render() {
        return (
            <div>
                <form className='ui form' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    {this.generateField('Title')}
                    {this.generateField('Description')}
                    <div style={{display: 'grid', placeItems: 'center center'}}>
                        <div>
                            <button className='ui button green inverted' style={{maxWidth: '300px', marginBottom: '50px', margin: '25px'}}>Save</button>
                            <button className='ui button white inverted' style={{maxWidth: '300px', marginBottom: '50px', margin: '25px'}} onClick={this.props.callBack}>Cancel</button>
                        </div>
                    </div>
                </form>
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

const formWrappedStreamEdit = reduxForm({form: 'editStream', validate})(StreamEdit)

const mapStateToProps = (state) => {
    return {userId: state.auth.userId}
}

export default connect(mapStateToProps, {editAStream})(formWrappedStreamEdit)

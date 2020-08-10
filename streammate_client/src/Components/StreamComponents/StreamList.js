import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'

//import action creators
import {loadStreamListPage} from '../../Redux/ActionCreators/LoadStreamListPage'
import {fetchAllStreams} from '../../Redux/ActionCreators/StreamManipulation/FetchAllStreams'
import {deleteAStream} from '../../Redux/ActionCreators/StreamManipulation/DeleteAStream'

//import components
import StreamEdit from './StreamEdit'

//import from react router
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

class StreamList extends Component {

    //life-cycle methods

    constructor(props) {
        super(props)
        this.state = {editModal: {isVisible: false, streamId: null}, deleteModal: {isVisible: false, streamId: null}}
    }

    componentDidMount() {
        console.log('hello!')
        this.props.loadStreamListPage()
        this.props.fetchAllStreams()
        this.setState({editModal: {isVisible: false, streamId: null}, deleteModal: {isVisible: false, streamId: null}})
        console.log(this.props)
    }

    //onClick functions

    clickDeleteButton = () => {
        this.setState({deleteModal: {isVisible: false, streamId: null}});
        this.props.deleteAStream(this.state.deleteModal.streamId)
    }

    //callback fucntions (passed to children components)

    onEditSubmissionCallback = () => {
        this.setState({...this.state, editModal: {isVisible: false, streamId: null}})
    }

    //render fucntions

    renderCreatorOptions = (userId, streamId) => {
        if(this.props.isSignedIn && this.props.userId === userId)
            return (
                <div class="ui right floated top aligned">
                    <button class="ui icon button" style={{background: 'none'}} onClick={() => this.setState({editModal: {isVisible: true, streamId}})}>
                            <i class="large top aligned pencil alternate icon white"></i>
                        </button>
                    <button class="ui icon button" style={{background: 'none', marginLeft: '20px'}} onClick={() => this.setState({deleteModal: {isVisible: true, streamId}})}>
                        <i class="large trash icon white"></i>
                    </button>
                    <Link to={`/view/${streamId}`}>
                        <button class="ui icon button" style={{background: 'none', marginLeft: '20px'}}>
                            <i class="large arrow right icon white" style={{marginLeft: '20px'}}></i>
                        </button>
                    </Link>
                </div>
            );
        
        return(
            <div class="ui right floated top aligned">
                <Link to={`/view/${streamId}`}>
                    <button class="ui icon button" style={{background: 'none', marginLeft: '20px'}}>
                        <i class="large arrow right icon white" style={{marginLeft: '20px'}}></i>
                    </button>
                </Link>
            </div>
        );
    }

    renderStreamList = () => {
        console.log(this.props.streams)
        return this.props.streams.map((stream) => {
            return(
                <div className='item' style={{marginTop: '20px', height: '10vh'}}>
                    {this.renderCreatorOptions(stream.userId, stream.id)}
                    <i class="large middle rss icon white"></i>
                    <div className='content'>
                        <Link to={`/view/${stream.id}`}>
                            <div className='header' style={{color: 'white', fontSize: '1.5rem'}}>
                                {stream.Title}
                            </div>
                        </Link>
                        <div className='description' style={{color: 'rgb(135, 135, 135)', fontSize: '1rem', marginTop: '10px'}}>
                            {stream.Description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.editModal.isVisible} style={{overlay: style.overlay, content: {...style.content, top: '0px'}}}>
                    <StreamEdit streamId={this.state.editModal.streamId} callBack={this.onEditSubmissionCallback}/>
                </Modal>
                <Modal isOpen={this.state.deleteModal.isVisible} style={style}>
                    <h1 className='ui header' style={{color: 'white'}}>Are you sure you want to delete this stream?</h1>
                    <div style={{display: 'grid', placeItems: 'center center'}}>
                        <div>
                            <button className='ui inverted button red' style={{maxWidth: '300px', marginBottom: '50px', margin: '25px'}} onClick={this.clickDeleteButton}>Delete</button>
                            <button className='ui inverted button' style={{maxWidth: '300px', marginBottom: '50px', margin: '25px'}} onClick={() => this.setState({deleteModal: {isVisible: false, streamId: null}})}>Cancel</button>
                        </div>
                    </div>
                </Modal>
                <div className='ui middle aligned animated list' style={{marginTop: '50px', width: '40vw'}}>
                    {this.renderStreamList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {loadStreamListPage, fetchAllStreams, deleteAStream})(StreamList)

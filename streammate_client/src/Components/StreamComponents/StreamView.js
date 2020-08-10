import React, { Component } from 'react'
import {connect} from 'react-redux'

//import action creators
import {fetchAStream} from '../../Redux/ActionCreators/StreamManipulation/FetchAStream'
import {loadStreamViewPage} from '../../Redux/ActionCreators/LoadStreamViewPage'

class StreamView extends Component {
    componentDidMount() {
        this.props.fetchAStream(this.props.match.params.id);
        this.props.loadStreamViewPage();
    }

    //render functions

    renderStreamInfo = () => {
        if(this.props.stream){
            console.log(this.props.stream)
            return(
                <div>
                    <h1>{this.props.stream.Title}</h1>
                    <h5>{this.props.stream.Description}</h5>
                </div>
            );
        }

        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    render() {
        return (
            <div style={{marginTop: '50px'}}>
                {this.renderStreamInfo()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
} 

export default connect(mapStateToProps, {fetchAStream, loadStreamViewPage})(StreamView)

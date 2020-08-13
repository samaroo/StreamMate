import React, { Component } from 'react'
import {connect} from 'react-redux'

//flv.hljs
import flv from 'flv.js'

//import action creators
import {fetchAStream} from '../../Redux/ActionCreators/StreamManipulation/FetchAStream'
import {loadStreamViewPage} from '../../Redux/ActionCreators/LoadStreamViewPage'

class StreamView extends Component {
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchAStream(this.props.match.params.id);
        this.props.loadStreamViewPage();
        this.constructFLVPlayer();
    }

    componentDidUpdate() {
        this.constructFLVPlayer();
    }

    constructFLVPlayer = () => {
        if(!this.props.stream){
            return;
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:3002/live/${this.props.match.params.id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    //render functions

    renderStreamInfo = () => {
        if(this.props.stream){
            console.log(this.props.stream)
            return(
                <div style={{marginTop: '10px'}}>
                    <h2>{this.props.stream.Title}</h2>
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
            <div style={{marginTop: '-40px'}}>
                <video controls style={{width: '90%', marginTop: '50px', borderRadius: '10px'}} ref={this.videoRef}/>
                {this.renderStreamInfo()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
} 

export default connect(mapStateToProps, {fetchAStream, loadStreamViewPage})(StreamView)

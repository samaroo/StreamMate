import axios from 'axios'

export const fetchAllStreams = () => async dispatch => {
    console.log('FETCH_ALL')
    const response = await axios.get('http://localhost:3001/streams')
    dispatch({type: 'FETCH_ALL_STREAMS', payload: response.data})
}
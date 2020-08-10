import axios from 'axios'

export const fetchAStream = id => async dispatch => {
    console.log('FETCH')
    const response = await axios.get(`http://localhost:3001/streams/${id}`)
    console.log(response)
    dispatch({type: 'FETCH_A_STREAM', payload: response.data})
}
import axios from 'axios'

export const deleteAStream = id => async dispatch => {
    console.log('DELETE')
    await axios.delete(`http://localhost:3001/streams/${id}`)
    dispatch({type: 'DELETE_A_STREAM', payload: id})
}
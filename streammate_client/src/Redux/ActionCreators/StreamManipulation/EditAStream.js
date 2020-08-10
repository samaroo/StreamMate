import axios from 'axios'

export const editAStream = (id, formData, userId) => async dispatch => {
    console.log('EDIT')
    const response = await axios.put(`http://localhost:3001/streams/${id}`, {...formData, userId})
    dispatch({type: 'EDIT_A_STREAM', payload: response.data})
}
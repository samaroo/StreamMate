import axios from 'axios'

export const createAStream = (formData) => async (dispatch, getState) => {
    console.log('CREATE')
    const newStream = {...formData, userId: getState().auth.userId}
    const response = await axios.post('http://localhost:3001/streams', newStream)
    dispatch({type: 'CREATE_A_STREAM', payload: response.data})
    console.log('RESPONSE')
    console.log(response)
    dispatch({type: (response.status === 201 ? 'SUCCESSFUL_CREATION' : 'FAILED_CREATION')})
}
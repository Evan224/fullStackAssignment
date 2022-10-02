import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        hideNotification(state, action){
            return ''
        }
    }
})

let timeoutId=null;

export const setNotification = (content, time) => {
    return async dispatch => {
        clearTimeout(timeoutId)
        dispatch(notificationSlice.actions.setNotification(content))
        timeoutId=setTimeout(() => {
            dispatch(notificationSlice.actions.hideNotification())
        }, time*1000)
    }
}

export const { hideNotification} = notificationSlice.actions
export default notificationSlice.reducer
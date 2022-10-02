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

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(notificationSlice.actions.setNotification(content))
        setTimeout(() => {
            dispatch(notificationSlice.actions.hideNotification())
        }, time*1000)
    }
}

export const { hideNotification} = notificationSlice.actions
export default notificationSlice.reducer
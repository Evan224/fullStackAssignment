import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  token: '',
  password: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    }
  }
})


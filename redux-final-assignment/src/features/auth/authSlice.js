import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.loggedInUser = action.payload
    },
    loggedOutUser: (state, action) => {
      state.loggedInUser = undefined
      localStorage.removeItem('token')
    },
  },
})

export default authSlice.reducer
export const { loggedInUser, loggedOutUser } = authSlice.actions

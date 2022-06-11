import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../types/schema'

type InitialState = {
  isAuthenticated: boolean
  user: User | null
  error?: Error
}

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFail: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { loginSuccess, loginFail, logout } = authSlice.actions
export default authSlice.reducer

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { instance } from '../../axios/instance'
import { request } from '../../axios/requests'
import { User } from '../../types/schema'
import { RootState } from '../store'

type InitialState = {
  isAuthenticated: boolean
  user: User | null
  error?: Error
}

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
}

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const hasAccessToken = state.auth.isAuthenticated

    if (hasAccessToken) {
      const res = await instance.get<User>(request('users', 'profile'))
      return res.data
    }
    return null
  },
)

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
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const { loginSuccess, loginFail, logout } = authSlice.actions
export default authSlice.reducer

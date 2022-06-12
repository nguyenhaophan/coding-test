import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/authSlice'

let hasAccessToken = false
if (typeof window !== 'undefined') {
  if (localStorage.getItem('access_token')) {
    hasAccessToken = true
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: hasAccessToken,
      user: null,
      status: 'idle',
    },
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

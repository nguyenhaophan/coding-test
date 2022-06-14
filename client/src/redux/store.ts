import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/authSlice'
import resReducer from './features/resSlice'

let hasAccessToken = false
if (localStorage.getItem('access_token')) {
  hasAccessToken = true
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    res: resReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: hasAccessToken,
      user: null,
      status: 'idle',
    },
    res: {
      chosenRes: [],
    },
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

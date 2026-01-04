import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './admin-slice'
import authReducer from './auth-slice'

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

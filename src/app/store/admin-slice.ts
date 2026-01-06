import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './auth-slice'

export interface AdminState {
  users: Array<UserState>
}

const initialState: AdminState = {
  users: []
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<number>) => {
      //state.value += action.payload
    },
  },
})

// export const { increment, decrement, incrementByAmount } = adminSlice.actions

export default adminSlice.reducer

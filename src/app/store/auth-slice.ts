import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
  email: string,
  fullName: string,
  lastName: string,
  privilege: string,
  balance: number,
  plan: number,
  active: boolean,
  verified: boolean,
  signed: boolean
}

const initialState: UserState = {
  email: "",
  fullName: "",
  lastName: "",
  privilege: "",
  balance: 0,
  plan: 0,
  active: false,
  verified: false,
  signed: false
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<UserState>) => {
      state.signed = true;
      Object.assign(state, action.payload);
    },
    signup: (state, action: PayloadAction<UserState>) => {
      
    },
    signout: (state) => {
      Object.assign(state, initialState);
    }
  },
})

export const { signin, signup, signout } = authSlice.actions

export default authSlice.reducer

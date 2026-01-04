import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  privilege: string,
  balance: number,
  plan: number,
  active: boolean,
  verified: boolean,
  signed: boolean
}

const initialState: UserState = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
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
    signin: (state, action: PayloadAction<any>) => {
      state.signed = true;
      Object.assign(state, action.payload);
    },
    signup: (state, action: PayloadAction<any>) => {
      
    },
    signout: (state) => {
      Object.assign(state, initialState);
    },
    update: (state, action: PayloadAction<any>) => {
      Object.assign(state, action.payload);
    }
  },
})

export const { signin, signup, signout, update } = authSlice.actions

export default authSlice.reducer

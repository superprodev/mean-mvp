import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './auth-slice'

export interface Message {
  from: string,
  to: string,
  content: string,
  date: Date
}

export interface ChatState {
  users: Array<UserState>,
  messages: Array<Message>
}

const initialState: ChatState = {
  users: [],
  messages: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    fetchMessages: (state, action: PayloadAction<any>) => {
      state.messages = action.payload;
    }
  },
})

export const { fetchUsers } = chatSlice.actions

export default chatSlice.reducer

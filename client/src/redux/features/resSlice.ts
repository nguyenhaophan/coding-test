import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Resource } from '../../types/data'

type InitialState = {
  chosenRes: Resource[]
}

const initialState: InitialState = {
  chosenRes: [],
}

export const resSlice = createSlice({
  name: 'res',
  initialState,
  reducers: {
    addRes: (state, action: PayloadAction<Resource>) => {
      const existed = state.chosenRes.find(
        (res) => res.resourceId === action.payload.resourceId,
      )
      if (!existed) {
        state.chosenRes = [...state.chosenRes, action.payload]
      }
    },
    deleteRes: (state, action: PayloadAction<string>) => {
      state.chosenRes = state.chosenRes.filter(
        (res) => res.resourceId !== action.payload,
      )
    },
  },
})

export const { addRes, deleteRes } = resSlice.actions
export default resSlice.reducer

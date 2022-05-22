import store from 'store'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '.'

export interface SearchIndexState {
  itemIndex: number
}

const INITIAL_STATE: SearchIndexState = {
  itemIndex: store.get('search.itemIndex') || 0,
}

const searchSlice = createSlice({
  name: 'search',
  initialState: INITIAL_STATE,
  reducers: {
    decrementItemIndex: (state) => {
      state.itemIndex -= 1
    },
    incrementItemIndex: (state) => {
      state.itemIndex += 1
    },
    resetItemIndex: (state) => {
      state.itemIndex = -1
    },
  },
})

export const { decrementItemIndex, incrementItemIndex, resetItemIndex } = searchSlice.actions
export const getItemIndex = (state: RootState): number => state.searchIndex.itemIndex

export default searchSlice.reducer

import store from 'store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    setItemIndex: (state: SearchIndexState, action: PayloadAction<number>) => {
      state.itemIndex = action.payload
    },
  },
})

export const { setItemIndex } = searchSlice.actions

export default searchSlice.reducer

// Selector =====================

export const getItemIndex = (state: RootState): number => state.searchIndex.itemIndex

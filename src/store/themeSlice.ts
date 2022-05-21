import { createSlice } from '@reduxjs/toolkit'
import store from 'store'

const themeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    darkMode: store.get('darkMode') || false,
  },
  reducers: {
    changeMode: (state) => {
      state.darkMode = !state.darkMode
      store.set('darkMode', state.darkMode)
    },
  },
})

export const { changeMode } = themeSlice.actions
export default themeSlice.reducer

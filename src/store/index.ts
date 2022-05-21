import { configureStore } from '@reduxjs/toolkit'
import searchIndex from './searchIndex'
import themeSlice from './themeSlice'

export const store = configureStore({
  reducer: {
    darkMode: themeSlice,
    searchIndex,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
